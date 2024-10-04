import { Flex, Text, VStack } from "@chakra-ui/react";
import { useGetAllParticipants } from "../../services";
import { LabelledContent } from "../common/LabelledContent";
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
                <Flex w="full" justifyContent="center">
                    <LabelledContent
                        label="Spendable per participant"
                        alignItems="center"
                    >
                        <Text
                            fontSize="xxx-large"
                            fontWeight="bold"
                        >{`${spendablePerParticipant.toFixed(2)} EUR`}</Text>
                    </LabelledContent>
                </Flex>
            </VStack>

            <ParticipantAdjustments participantList={participantList} />

            {participantList.map((participant) => (
                <ParticipantExpenseBreakdown
                    key={participant.id}
                    participant={participant}
                />
            ))}
        </VStack>
    );
}
