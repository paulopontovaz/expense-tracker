import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
    ExpenseEntry,
    ExpenseEntryUpdate,
} from "../../../../server/db/models/schema";
import { api } from "../_common";
import { getExpenseEntriesQueryKey } from "./useGetAllExpenseEntries";

type EditExpenseEntryResponse = {
    expenseEntry: ExpenseEntry;
};

export const editExpenseEntryRequest = async (
    expenseEntry: ExpenseEntryUpdate,
): Promise<EditExpenseEntryResponse> =>
    (await api
        .patch(`/expense-entries/${expenseEntry.id}`, {
            json: expenseEntry,
        })
        .json()) as EditExpenseEntryResponse;

export const useEditExpenseEntry = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: editExpenseEntry } = useMutation({
        mutationFn: editExpenseEntryRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getExpenseEntriesQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { editExpenseEntry };
};
