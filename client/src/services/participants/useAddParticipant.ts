import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
    Participant,
    ParticipantInsert,
} from "../../../../server/db/models/schema";
import { api } from "../_common";
import { getParticipantsQueryKey } from "./useGetAllParticipants";

type AddParticipantResponse = { participant: Participant };

export const addParticipantRequest = async (
    participant: ParticipantInsert,
): Promise<AddParticipantResponse> =>
    (await api
        .post("participants", { json: participant })
        .json()) as AddParticipantResponse;

export const useAddParticipant = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: addParticipant } = useMutation({
        mutationFn: addParticipantRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getParticipantsQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { addParticipant };
};
