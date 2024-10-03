import { VStack } from "@chakra-ui/react";
import type { Participant } from "../../../../../server/db/models/schema";
import { useGetAllParticipants } from "../../../services";
import { ParticipantListItem } from "./ParticipantListItem";

type ParticipantListProps = {
    onOpen: (participant?: Participant) => void;
};

export function ParticipantList(props: ParticipantListProps) {
    const { onOpen } = props;
    const { participantList } = useGetAllParticipants();

    return (
        <VStack w="full" h="full" spacing={3}>
            {participantList.map((participant) => (
                <ParticipantListItem
                    key={participant.id}
                    participant={participant}
                    onOpen={onOpen}
                />
            ))}
        </VStack>
    );
}
