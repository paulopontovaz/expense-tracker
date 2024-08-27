import { VStack } from "@chakra-ui/react";
import { useGetAllParticipants } from "../../../services";
import { ParticipantListItem } from "./ParticipantListItem";

export function ParticipantList() {
    const { participants } = useGetAllParticipants();
    return (
        <VStack w="full" h="full" spacing={3}>
            {participants.map((participant) => (
                <ParticipantListItem
                    key={participant.id}
                    participant={participant}
                />
            ))}
        </VStack>
    );
}
