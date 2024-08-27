import { useQuery } from "@tanstack/react-query";
import type { Participant } from "../../../../server/db/models/schema";
import { api } from "../_common";

type FetchParticipantsResponse = {
    participants: Participant[];
};

export const fetchAllParticipantsRequest = async () => {
    const response = (await api
        .get("participants")
        .json()) as FetchParticipantsResponse;

    return response.participants ?? [];
};

export const getParticipantsQueryKey = () => ["participants"];

export const useGetAllParticipants = () => {
    const { data } = useQuery({
        queryKey: getParticipantsQueryKey(),
        queryFn: fetchAllParticipantsRequest,
        retry: 0,
    });

    return { participants: data ?? [] };
};
