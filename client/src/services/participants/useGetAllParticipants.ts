import { useQuery } from "@tanstack/react-query";
import type { Participant } from "../../../../server/db/models/schema";
import { api } from "../_common";

type FetchAllParticipantsResponse = {
    participants: Participant[];
};

export const fetchAllParticipantsRequest = async () => {
    const response = (await api
        .get("participants")
        .json()) as FetchAllParticipantsResponse;

    return response.participants ?? [];
};

export const getAllParticipantsQueryKey = () => ["participants"];

export const useGetAllParticipants = () => {
    const { data } = useQuery({
        queryKey: getAllParticipantsQueryKey(),
        queryFn: fetchAllParticipantsRequest,
        retry: 0,
    });

    return { participants: data ?? [] };
};
