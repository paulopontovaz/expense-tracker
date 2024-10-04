import { Text, VStack } from "@chakra-ui/react";
import type { FetchAllParticipantsResponse } from "../../services/participants/useGetAllParticipants";
import { generateTransfers, getParticipantTotal } from "./expenseSummaryUtils";

type ParticipantAdjustmentsProps = {
    participantList: FetchAllParticipantsResponse["participantList"];
};

export function ParticipantAdjustments(props: ParticipantAdjustmentsProps) {
    const { participantList } = props;

    const isTotalBalanceNegative =
        participantList.reduce(
            (acc, participant) =>
                acc + getParticipantTotal(participant.recurrentExpenses),
            0,
        ) < 0;

    if (isTotalBalanceNegative) {
        return (
            <Text fontSize="large">
                The total balance is negative after paying the expenses. No
                transfers should be made. Make sure to pay your bills!
            </Text>
        );
    }

    const transfers = generateTransfers(participantList);

    return (
        <VStack>
            {transfers.map((transfer) => (
                <Text key={transfer.from + transfer.to}>
                    <Text
                        as="span"
                        fontWeight="bold"
                    >{`${transfer.from} `}</Text>{" "}
                    should transfer
                    <Text
                        as="span"
                        fontWeight="bold"
                    >{` ${transfer.amount.toFixed(2)} EUR `}</Text>
                    to{" "}
                    <Text as="span" fontWeight="bold">{`${transfer.to} `}</Text>
                </Text>
            ))}
        </VStack>
    );
}
