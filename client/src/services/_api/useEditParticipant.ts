import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
    Participant,
    ParticipantUpdate,
} from "../../../../server/db/models/schema";
import { API_URL, api } from "./_common";
import { getParticipantsQueryKey } from "./useGetAllParticipants";

type EditParticipantResponse = {
    participant: Participant;
};

export const editParticipantRequest = async (
    participant: ParticipantUpdate,
): Promise<EditParticipantResponse> =>
    (await api
        .patch(`${API_URL}/${participant.id}`, {
            json: participant,
        })
        .json()) as EditParticipantResponse;

export const useEditParticipant = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: editParticipant } = useMutation({
        mutationFn: editParticipantRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getParticipantsQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { editParticipant };
};
