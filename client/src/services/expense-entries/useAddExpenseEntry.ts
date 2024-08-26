import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
    ExpenseEntry,
    ExpenseEntryInsert,
} from "../../../../server/db/models/schema";
import { api } from "../_common";
import { getExpenseEntriesQueryKey } from "./useGetAllExpenseEntries";

type AddExpenseEntryResponse = { expenseEntry: ExpenseEntry };

export const addExpenseEntryRequest = async (
    expenseEntry: ExpenseEntryInsert,
): Promise<AddExpenseEntryResponse> =>
    (await api
        .post("/expense-entries", { json: expenseEntry })
        .json()) as AddExpenseEntryResponse;

export const useAddExpenseEntry = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: addExpenseEntry } = useMutation({
        mutationFn: addExpenseEntryRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getExpenseEntriesQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { addExpenseEntry };
};
