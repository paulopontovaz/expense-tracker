import { HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { useGetAllParticipants } from "../../services";
import type { FetchAllParticipantsResponse } from "../../services/participants/useGetAllParticipants";

const getParticipantTotal = (
    participant: FetchAllParticipantsResponse["participantList"][number],
) => {
    return participant.recurrentExpenses.reduce((acc, recurrentExpense) => {
        return acc + recurrentExpense.price / recurrentExpense.frequency;
    }, 0);
};

const getSpendableTotal = (
    participants: FetchAllParticipantsResponse["participantList"],
) => {
    return (
        participants.reduce((acc, participant) => {
            return (
                acc + (participant.income - getParticipantTotal(participant))
            );
        }, 0) / participants.length
    );
};

export function ExpenseSummary() {
    const { participantList } = useGetAllParticipants();

    return (
        <VStack w="full" spacing={6}>
            <VStack w="full" spacing={12}>
                <Text fontSize="x-large">Expense Summary</Text>
                <HStack w="full">
                    <Heading>{`Spendable per participant: ${getSpendableTotal(participantList).toFixed(2)} EUR`}</Heading>
                </HStack>
            </VStack>

            {participantList.map((participant) => (
                <VStack
                    key={participant.id}
                    w="full"
                    padding={3}
                    borderWidth={1}
                    borderRadius={6}
                >
                    <HStack w="full" justifyContent="space-between">
                        <Text fontSize="larger" fontWeight="semibold">
                            {participant.name}
                        </Text>
                        <Text fontSize="larger">{`Monthly Income: ${participant.income.toFixed(2)} EUR`}</Text>
                    </HStack>
                    <VStack
                        w="full"
                        alignItems="center"
                        spacing={6}
                        p={3}
                        borderWidth={1}
                        borderRadius={6}
                    >
                        <Text fontSize="larger" alignSelf="flex-start">
                            {`Total Expenses: ${getParticipantTotal(participant).toFixed(2)} EUR`}
                        </Text>
                        <VStack w="50%" spacing={4} p={3}>
                            {participant.recurrentExpenses.map(
                                (recurrentExpense) => (
                                    <HStack
                                        key={recurrentExpense.id}
                                        w="full"
                                        justifyContent="space-between"
                                        borderBottomWidth={1}
                                    >
                                        <Text>
                                            {recurrentExpense.description}
                                        </Text>
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
                </VStack>
            ))}
        </VStack>
    );
}
