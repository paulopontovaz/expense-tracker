import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
    ExpensePeriodSummary,
    ExpensePeriodSummaryInsert,
} from "../../../../server/db/models/schema";
import { api } from "../_common";
import { getExpensePeriodSummariesQueryKey } from "./useGetAllExpensePeriodSummaries";

type AddExpensePeriodSummaryResponse = {
    expensePeriodSummary: ExpensePeriodSummary;
};

export const addExpensePeriodSummaryRequest = async (
    expensePeriodSummary: ExpensePeriodSummaryInsert,
): Promise<AddExpensePeriodSummaryResponse> =>
    (await api
        .post("/expense-period-summaries", { json: expensePeriodSummary })
        .json()) as AddExpensePeriodSummaryResponse;

export const useAddExpensePeriodSummary = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: addExpensePeriodSummary } = useMutation({
        mutationFn: addExpensePeriodSummaryRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getExpensePeriodSummariesQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { addExpensePeriodSummary };
};
