import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../_common";
import { getRecurrentExpensesQueryKey } from "./useGetAllRecurrentExpenses";

export const deleteRecurrentExpenseRequest = async (
    recurrentExpenseId: number,
): Promise<number> =>
    (await api
        .delete(`/recurrent-expenses/${recurrentExpenseId}`)
        .json()) as number;

export const useDeleteRecurrentExpense = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: deleteRecurrentExpense } = useMutation({
        mutationFn: deleteRecurrentExpenseRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getRecurrentExpensesQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { deleteRecurrentExpense };
};
