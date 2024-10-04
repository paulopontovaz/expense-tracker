import { Text, VStack } from "@chakra-ui/react";
import { useGetAllParticipants } from "../../services";
import { ParticipantAdjustments } from "./ParticipantAdjustments";
import { ParticipantExpenseBreakdown } from "./ParticipantExpenseBreakdown";
import { getSpendablePerParticipant } from "./expenseSummaryUtils";

export function ExpenseSummary() {
    const { participantList } = useGetAllParticipants();
    const spendablePerParticipant = getSpendablePerParticipant(participantList);

    return (
        <VStack w="full" spacing={6}>
            <VStack w="full" spacing={12} alignItems="flex-start">
                <Text fontSize="x-large" fontWeight="bold">
                    Expense Summary
                </Text>
                <VStack w="full">
                    <Text fontSize="large">Spendable per participant</Text>
                    <Text
                        fontSize="xxx-large"
                        fontWeight="bold"
                    >{`${spendablePerParticipant.toFixed(2)} EUR`}</Text>
                    <ParticipantAdjustments participantList={participantList} />
                </VStack>
            </VStack>

            {participantList.map((participant) => (
                <ParticipantExpenseBreakdown
                    key={participant.id}
                    participant={participant}
                />
            ))}
        </VStack>
    );
}
