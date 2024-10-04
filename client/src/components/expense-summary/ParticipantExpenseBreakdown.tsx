import { HStack, Text, VStack } from "@chakra-ui/react";
import type { FetchParticipantResponse } from "../../services/participants/useGetParticipant";
import { getParticipantTotal } from "./expenseSummaryUtils";

type ParticipantExpenseBreakdownProps = {
    participant: FetchParticipantResponse["participant"];
};

export function ParticipantExpenseBreakdown(
    props: ParticipantExpenseBreakdownProps,
) {
    const { participant } = props;

    return (
        <VStack
            key={participant.id}
            w="50%"
            padding={3}
            borderWidth={1}
            borderRadius={6}
            spacing={6}
        >
            <HStack w="full" justifyContent="space-between" alignItems="center">
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
                {participant.recurrentExpenses.map((recurrentExpense) => (
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
                ))}
            </VStack>
        </VStack>
    );
}
