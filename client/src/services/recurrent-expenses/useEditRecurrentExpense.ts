import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
    RecurrentExpense,
    RecurrentExpenseUpdate,
} from "../../../../server/db/models/schema";
import { api } from "../_common";
import { getRecurrentExpensesQueryKey } from "./useGetAllRecurrentExpenses";

type EditRecurrentExpenseResponse = {
    recurrentExpense: RecurrentExpense;
};

export const editRecurrentExpenseRequest = async (
    recurrentExpense: RecurrentExpenseUpdate,
): Promise<EditRecurrentExpenseResponse> =>
    (await api
        .patch(`/recurrent-expenses/${recurrentExpense.id}`, {
            json: recurrentExpense,
        })
        .json()) as EditRecurrentExpenseResponse;

export const useEditRecurrentExpense = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: editRecurrentExpense } = useMutation({
        mutationFn: editRecurrentExpenseRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getRecurrentExpensesQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { editRecurrentExpense };
};
