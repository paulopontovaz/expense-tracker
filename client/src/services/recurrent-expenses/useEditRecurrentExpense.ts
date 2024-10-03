import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
    RecurrentExpense,
    RecurrentExpenseUpdate,
} from "../../../../server/db/models/schema";
import { api } from "../_common";
import { getParticipantQueryKey } from "../participants/useGetParticipant";
import { getRecurrentExpensesQueryKey } from "./useGetAllRecurrentExpenses";

type EditRecurrentExpenseResponse = {
    recurrentExpense: RecurrentExpense;
};

export const editRecurrentExpenseRequest = async (
    recurrentExpense: RecurrentExpenseUpdate,
): Promise<EditRecurrentExpenseResponse> =>
    (await api
        .patch(`recurrent-expenses/${recurrentExpense.id}`, {
            json: recurrentExpense,
        })
        .json()) as EditRecurrentExpenseResponse;

type EditRecurrentExpenseOptions = {
    participantId?: string;
};

export const useEditRecurrentExpense = (
    options: EditRecurrentExpenseOptions,
) => {
    const { participantId } = options;
    const queryClient = useQueryClient();
    const { mutateAsync: editRecurrentExpense } = useMutation({
        mutationFn: editRecurrentExpenseRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getRecurrentExpensesQueryKey(),
                refetchType: "active",
            });
            queryClient.invalidateQueries({
                queryKey: getParticipantQueryKey(participantId),
                refetchType: "active",
            });
        },
    });

    return { editRecurrentExpense };
};
