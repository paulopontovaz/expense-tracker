import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../_common";
import { getExpensePeriodSummariesQueryKey } from "./useGetAllExpensePeriodSummaries";

export const deleteExpensePeriodSummaryRequest = async (
    expensePeriodSummaryId: number,
): Promise<number> =>
    (await api
        .delete(`/expense-period-summaries/${expensePeriodSummaryId}`)
        .json()) as number;

export const useDeleteExpensePeriodSummary = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: deleteExpensePeriodSummary } = useMutation({
        mutationFn: deleteExpensePeriodSummaryRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getExpensePeriodSummariesQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { deleteExpensePeriodSummary };
};
