import { useQuery } from "@tanstack/react-query";
import type { ExpensePeriodSummary } from "../../../../server/db/models/schema";
import { api } from "../_common";

type FetchExpensePeriodSummariesResponse = {
    expenseEntries: ExpensePeriodSummary[];
};

export const fetchAllExpensePeriodSummariesRequest = async () => {
    const response = (await api
        .get("/expense-period-summaries")
        .json()) as FetchExpensePeriodSummariesResponse;

    return response.expenseEntries ?? [];
};

export const getExpensePeriodSummariesQueryKey = () => ["expense-entries"];

export const useGetAllExpensePeriodSummaries = () => {
    const { data } = useQuery({
        queryKey: getExpensePeriodSummariesQueryKey(),
        queryFn: fetchAllExpensePeriodSummariesRequest,
        retry: 0,
    });

    return { expensePeriodSummaries: data ?? [] };
};
