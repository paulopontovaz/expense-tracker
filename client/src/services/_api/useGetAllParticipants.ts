import { useQuery } from "@tanstack/react-query";
import type { Participant } from "../../../../server/db/models/schema";
import { API_URL, api } from "./_common";

type FetchParticipantsResponse = {
    payments: Participant[];
};

export const fetchAllParticipantsRequest = async () => {
    const response = (await api
        .get(API_URL)
        .json()) as FetchParticipantsResponse;

    return response.payments ?? [];
};

export const getParticipantsQueryKey = () => ["participants"];

export const useGetAllParticipants = () => {
    const { data } = useQuery({
        queryKey: getParticipantsQueryKey(),
        queryFn: fetchAllParticipantsRequest,
        retry: 0,
    });

    return { payments: data ?? [] };
};
