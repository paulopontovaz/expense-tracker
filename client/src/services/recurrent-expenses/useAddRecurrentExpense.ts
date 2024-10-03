import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
    RecurrentExpense,
    RecurrentExpenseInsert,
} from "../../../../server/db/models/schema";
import { api } from "../_common";
import { getParticipantQueryKey } from "../participants/useGetParticipant";
import { getRecurrentExpensesQueryKey } from "./useGetAllRecurrentExpenses";

type AddRecurrentExpenseResponse = { recurrentExpense: RecurrentExpense };

export const addRecurrentExpenseRequest = async (
    recurrentExpense: RecurrentExpenseInsert,
): Promise<AddRecurrentExpenseResponse> =>
    (await api
        .post("recurrent-expenses", { json: recurrentExpense })
        .json()) as AddRecurrentExpenseResponse;

type AddRecurrentExpenseOptions = {
    participantId?: string;
};

export const useAddRecurrentExpense = (options: AddRecurrentExpenseOptions) => {
    const { participantId } = options;
    const queryClient = useQueryClient();

    const { mutateAsync: addRecurrentExpense } = useMutation({
        mutationFn: addRecurrentExpenseRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getRecurrentExpensesQueryKey(),
                refetchType: "active",
            });
            queryClient.invalidateQueries({
                queryKey: getParticipantQueryKey(participantId),
                refetchType: "active",
            });
        },
    });

    return { addRecurrentExpense };
};
