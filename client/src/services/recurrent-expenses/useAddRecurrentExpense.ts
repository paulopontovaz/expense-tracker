import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
    RecurrentExpense,
    RecurrentExpenseInsert,
} from "../../../../server/db/models/schema";
import { api } from "../_common";
import { getRecurrentExpensesQueryKey } from "./useGetAllRecurrentExpenses";

type AddRecurrentExpenseResponse = { recurrentExpense: RecurrentExpense };

export const addRecurrentExpenseRequest = async (
    recurrentExpense: RecurrentExpenseInsert,
): Promise<AddRecurrentExpenseResponse> =>
    (await api
        .post("/recurrent-expenses", { json: recurrentExpense })
        .json()) as AddRecurrentExpenseResponse;

export const useAddRecurrentExpense = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: addRecurrentExpense } = useMutation({
        mutationFn: addRecurrentExpenseRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getRecurrentExpensesQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { addRecurrentExpense };
};
