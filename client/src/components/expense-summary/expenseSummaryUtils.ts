import type { RecurrentExpense } from "../../../../server/db/models/schema";
import type { FetchAllParticipantsResponse } from "../../services/participants/useGetAllParticipants";

export function getParticipantTotal(recurrentExpenses: RecurrentExpense[]) {
    return recurrentExpenses.reduce(
        (acc, recurrentExpense) =>
            acc + recurrentExpense.price / recurrentExpense.frequency,
        0,
    );
}

export function getSpendablePerParticipant(
    participants: FetchAllParticipantsResponse["participantList"] = [],
) {
    return (
        participants.reduce(
            (acc, participant) =>
                acc +
                (participant.income -
                    getParticipantTotal(participant.recurrentExpenses)),
            0,
        ) / participants.length
    );
}

type Transfer = {
    from: string;
    to: string;
    amount: number;
};

export function generateTransfers(
    participants: FetchAllParticipantsResponse["participantList"],
) {
    const spendablePerParticipant = getSpendablePerParticipant(participants);
    const participantsWithExpenses = participants.map((participant) => {
        const totalExpenses = getParticipantTotal(
            participant.recurrentExpenses,
        );

        return {
            ...participant,
            totalExpenses,
            adjustment:
                participant.income - totalExpenses - spendablePerParticipant,
        };
    });

    const under = participantsWithExpenses
        .filter((participant) => participant.adjustment < 0)
        .sort((a, b) => a.adjustment - b.adjustment);
    const over = participantsWithExpenses
        .filter((participant) => participant.adjustment > 0)
        .sort((a, b) => b.adjustment - a.adjustment);

    const transfers: Transfer[] = [];

    let i = 0;
    let j = 0;

    while (i < under.length && j < over.length) {
        const from = over[j];
        const to = under[i];

        const transferAmount = Math.min(from.adjustment, -to.adjustment);

        transfers.push({
            from: from.name,
            to: to.name,
            amount: transferAmount,
        });

        from.adjustment -= transferAmount;
        to.adjustment += transferAmount;

        if (from.adjustment === 0) {
            j++;
        }

        if (to.adjustment === 0) {
            i++;
        }
    }

    return transfers;
}
