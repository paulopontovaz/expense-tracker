import { DeleteIcon } from "@chakra-ui/icons";
import { HStack, Heading, IconButton, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDeleteParticipant, useGetParticipant } from "../../../services";

export function ParticipantDetails() {
    const { participantId } = useParams();
    const { participant } = useGetParticipant({ participantId });
    const { deleteParticipant } = useDeleteParticipant();

    return participant ? (
        <VStack w="full" spacing={4}>
            <HStack w="full" justifyContent="space-between" spacing={3}>
                <VStack alignItems="flex-start">
                    <Text fontWeight="bold">{participant.name}</Text>
                    <Text pl={4}> Income (EUR): {participant.income}</Text>
                </VStack>
                <HStack>
                    <IconButton
                        icon={<DeleteIcon />}
                        aria-label={`Delete participant '${participant.name}'`}
                        onClick={() => deleteParticipant(participant.id)}
                    />
                    {/* TODO: Finish edit functionality */}
                    {/* <IconButton
                        icon={<EditIcon />}
                        aria-label={`Edit participant '${participant.name}'`}
                        onClick={() => onOpen(participant)}
                    /> */}
                </HStack>
            </HStack>
            <VStack w="full" alignItems="flex-start">
                <Heading>Recurrent Expenses</Heading>
            </VStack>
        </VStack>
    ) : null;
}
