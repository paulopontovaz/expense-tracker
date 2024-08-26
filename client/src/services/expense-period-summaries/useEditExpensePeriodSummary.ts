import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
    ExpensePeriodSummary,
    ExpensePeriodSummaryUpdate,
} from "../../../../server/db/models/schema";
import { api } from "../_common";
import { getExpensePeriodSummariesQueryKey } from "./useGetAllExpensePeriodSummaries";

type EditExpensePeriodSummaryResponse = {
    expensePeriodSummary: ExpensePeriodSummary;
};

export const editExpensePeriodSummaryRequest = async (
    expensePeriodSummary: ExpensePeriodSummaryUpdate,
): Promise<EditExpensePeriodSummaryResponse> =>
    (await api
        .patch(`/expense-period-summaries/${expensePeriodSummary.id}`, {
            json: expensePeriodSummary,
        })
        .json()) as EditExpensePeriodSummaryResponse;

export const useEditExpensePeriodSummary = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: editExpensePeriodSummary } = useMutation({
        mutationFn: editExpensePeriodSummaryRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getExpensePeriodSummariesQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { editExpensePeriodSummary };
};
