import { VStack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import type { Participant } from "../../../../../server/db/models/schema";
import { useDeleteParticipant, useGetAllParticipants } from "../../../services";
import { ConfirmModal } from "../../common/ConfirmModal";
import { ParticipantModal } from "../ParticipantModal";
import { ParticipantListItem } from "./ParticipantListItem";

export function ParticipantList() {
    const { participantList } = useGetAllParticipants();
    const { deleteParticipant } = useDeleteParticipant();

    const [currentParticipant, setParticipant] = useState<Participant | null>(
        null,
    );
    const {
        isOpen: isParticipantModalOpen,
        onOpen: onOpenParticipantModal,
        onClose: onCloseParticipantModal,
    } = useDisclosure();
    const {
        isOpen: isConfirmDeleteModalOpen,
        onOpen: onOpenConfirmDeleteModal,
        onClose: onCloseConfirmDeleteModal,
    } = useDisclosure();

    const handleOnOpen = (
        participant: Participant,
        action: "delete" | "edit",
    ) => {
        setParticipant(participant ?? null);

        if (action === "delete") {
            onOpenConfirmDeleteModal();
        }
        if (action === "edit") {
            onOpenParticipantModal();
        }
    };

    return (
        <VStack w="full" h="full" spacing={3}>
            {participantList.map((participant) => (
                <ParticipantListItem
                    key={participant.id}
                    participant={participant}
                    onOpenModal={handleOnOpen}
                />
            ))}
            {isParticipantModalOpen && (
                <ParticipantModal
                    isOpen={isParticipantModalOpen}
                    onClose={() => {
                        onCloseParticipantModal();
                        setParticipant(null);
                    }}
                    participant={currentParticipant}
                />
            )}
            <ConfirmModal
                isOpen={isConfirmDeleteModalOpen}
                onClose={onCloseConfirmDeleteModal}
                onConfirm={() =>
                    currentParticipant &&
                    deleteParticipant(currentParticipant?.id).then(
                        onCloseConfirmDeleteModal,
                    )
                }
                title="Confirm"
                text={`Are you sure you want to delete the participant "${currentParticipant?.name}"? This is an irreversible action.`}
            />
        </VStack>
    );
}
