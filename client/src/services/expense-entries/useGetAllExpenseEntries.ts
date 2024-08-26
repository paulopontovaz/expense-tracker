import { useQuery } from "@tanstack/react-query";
import type { ExpenseEntry } from "../../../../server/db/models/schema";
import { api } from "../_common";

type FetchExpenseEntriesResponse = {
    expenseEntries: ExpenseEntry[];
};

export const fetchAllExpenseEntriesRequest = async () => {
    const response = (await api
        .get("/expense-entries")
        .json()) as FetchExpenseEntriesResponse;

    return response.expenseEntries ?? [];
};

export const getExpenseEntriesQueryKey = () => ["expense-entries"];

export const useGetAllExpenseEntries = () => {
    const { data } = useQuery({
        queryKey: getExpenseEntriesQueryKey(),
        queryFn: fetchAllExpenseEntriesRequest,
        retry: 0,
    });

    return { expenseEntries: data ?? [] };
};
