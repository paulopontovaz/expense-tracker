import { HStack, Text, VStack } from "@chakra-ui/react";
import { useGetAllParticipants } from "../../services";
import { ParticipantAdjustments } from "./ParticipantAdjustments";
import {
    getParticipantTotal,
    getSpendablePerParticipant,
} from "./expenseSummaryUtils";

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
                <VStack
                    key={participant.id}
                    w="50%"
                    padding={3}
                    borderWidth={1}
                    borderRadius={6}
                    spacing={6}
                >
                    <HStack
                        w="full"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Text fontSize="x-large" fontWeight="semibold">
                            {participant.name}
                        </Text>
                        <Text fontSize="larger">{`Monthly Income: ${participant.income.toFixed(2)} EUR`}</Text>
                    </HStack>
                    <VStack w="full" spacing={4} p={3}>
                        <HStack
                            w="full"
                            justifyContent="space-between"
                            borderBottomWidth={1}
                            fontWeight="bold"
                            mb={4}
                        >
                            <Text>Total Expenses</Text>
                            <Text>
                                {getParticipantTotal(
                                    participant.recurrentExpenses,
                                ).toFixed(2)}
                            </Text>
                        </HStack>
                        {participant.recurrentExpenses.map(
                            (recurrentExpense) => (
                                <HStack
                                    key={recurrentExpense.id}
                                    w="full"
                                    justifyContent="space-between"
                                    borderBottomWidth={1}
                                >
                                    <Text>{recurrentExpense.description}</Text>
                                    <Text>
                                        {(
                                            recurrentExpense.price /
                                            recurrentExpense.frequency
                                        ).toFixed(2)}
                                    </Text>
                                </HStack>
                            ),
                        )}
                    </VStack>
                </VStack>
            ))}
        </VStack>
    );
}
