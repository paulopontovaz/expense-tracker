import { VStack } from "@chakra-ui/react";
import { useGetAllParticipants } from "../../../services";
import { ParticipantListItem } from "./ParticipantListItem";

type ParticipantListProps = {
    onOpen: () => void;
};

export function ParticipantList(props: ParticipantListProps) {
    const { onOpen } = props;
    const { participants } = useGetAllParticipants();
    return (
        <VStack w="full" h="full" spacing={3}>
            {participants.map((participant) => (
                <ParticipantListItem
                    key={participant.id}
                    participant={participant}
                    onOpen={onOpen}
                />
            ))}
        </VStack>
    );
}
