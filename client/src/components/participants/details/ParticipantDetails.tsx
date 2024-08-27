import { Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export function ParticipantDetails() {
    const { participantId } = useParams();

    return <Text>Participant Details: {participantId ?? "-"}</Text>;
}
