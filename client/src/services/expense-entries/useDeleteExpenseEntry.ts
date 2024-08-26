import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../_common";
import { getExpenseEntriesQueryKey } from "./useGetAllExpenseEntries";

export const deleteExpenseEntryRequest = async (
    expenseEntryId: number,
): Promise<number> =>
    (await api.delete(`/expense-entries/${expenseEntryId}`).json()) as number;

export const useDeleteExpenseEntry = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: deleteExpenseEntry } = useMutation({
        mutationFn: deleteExpenseEntryRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getExpenseEntriesQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { deleteExpenseEntry };
};
