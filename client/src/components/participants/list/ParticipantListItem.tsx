import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import type { Participant } from "../../../../../server/db/models/schema";

type ParticipantListItemProps = {
    participant: Participant;
    onOpenModal: (participant: Participant, action: "delete" | "edit") => void;
};

export function ParticipantListItem(props: ParticipantListItemProps) {
    const { onOpenModal, participant } = props;

    const navigate = useNavigate();

    return (
        <HStack w="full" justifyContent="space-between">
            <VStack alignItems="flex-start">
                <Text fontWeight="bold">{participant.name}</Text>
                <Text pl={4}> Income (EUR): {participant.income}</Text>
            </VStack>
            <HStack>
                <IconButton
                    icon={<DeleteIcon />}
                    aria-label={`Delete participant '${participant.name}'`}
                    onClick={() => onOpenModal(participant, "delete")}
                />
                <IconButton
                    icon={<EditIcon />}
                    aria-label={`Edit participant '${participant.name}'`}
                    onClick={() => onOpenModal(participant, "edit")}
                />
                <IconButton
                    icon={<ViewIcon />}
                    aria-label={`Delete participant '${participant.name}'`}
                    onClick={() => navigate(participant.id)}
                />
            </HStack>
        </HStack>
    );
}
