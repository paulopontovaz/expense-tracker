import { useQuery } from "@tanstack/react-query";
import type {
    Participant,
    RecurrentExpense,
} from "../../../../server/db/models/schema";
import { api } from "../_common";

export type FetchParticipantResponse = {
    participant: Participant & { recurrentExpenses: RecurrentExpense[] };
};

export const fetchParticipantRequest = async (participantId?: string) => {
    const response = participantId
        ? ((await api
              .get(`participants/${participantId}`)
              .json()) as FetchParticipantResponse)
        : null;

    return response?.participant ?? null;
};

export const getParticipantQueryKey = (participantId = "-") => [
    "participants",
    participantId,
];

type UseGetParticipantOptions = {
    participantId?: string;
};

export const useGetParticipant = (options: UseGetParticipantOptions) => {
    const { participantId } = options;

    const { data } = useQuery({
        queryKey: getParticipantQueryKey(participantId),
        queryFn: () =>
            participantId
                ? fetchParticipantRequest(participantId)
                : Promise.resolve(null),
        retry: 3,
    });

    return { participant: data ?? null };
};
