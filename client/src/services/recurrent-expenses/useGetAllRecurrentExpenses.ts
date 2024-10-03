import { useQuery } from "@tanstack/react-query";
import type { RecurrentExpense } from "../../../../server/db/models/schema";
import { api } from "../_common";

type FetchRecurrentExpensesResponse = {
    recurrentExpenses: RecurrentExpense[];
};

export const fetchAllRecurrentExpensesRequest = async () => {
    const response = (await api
        .get("recurrent-expenses")
        .json()) as FetchRecurrentExpensesResponse;

    return response.recurrentExpenses ?? [];
};

export const getRecurrentExpensesQueryKey = () => ["recurrent-expenses"];

export const useGetAllRecurrentExpenses = () => {
    const { data } = useQuery({
        queryKey: getRecurrentExpensesQueryKey(),
        queryFn: fetchAllRecurrentExpensesRequest,
        retry: 0,
    });

    return { recurrentExpenses: data ?? [] };
};
