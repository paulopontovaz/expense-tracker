import { useQuery } from "@tanstack/react-query";
import type { GetAllParticipantsServiceReturnType } from "../../../../server/api/services";
import { api } from "../_common";

export type FetchAllParticipantsResponse = {
    participantList: GetAllParticipantsServiceReturnType;
};

export const fetchAllParticipantsRequest = async () => {
    const response = (await api
        .get("participants")
        .json()) as FetchAllParticipantsResponse;

    return response.participantList ?? [];
};

export const getAllParticipantsQueryKey = () => ["participants"];

export const useGetAllParticipants = () => {
    const { data } = useQuery({
        queryKey: getAllParticipantsQueryKey(),
        queryFn: fetchAllParticipantsRequest,
        retry: 0,
    });

    return { participantList: data ?? [] };
};
