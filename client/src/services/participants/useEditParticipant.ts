import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
    Participant,
    ParticipantUpdate,
} from "../../../../server/db/models/schema";
import { api } from "../_common";
import { getAllParticipantsQueryKey } from "./useGetAllParticipants";

type EditParticipantResponse = {
    participant: Participant;
};

export const editParticipantRequest = async (
    participant: ParticipantUpdate,
): Promise<EditParticipantResponse> =>
    (await api
        .patch(`participants/${participant.id}`, {
            json: participant,
        })
        .json()) as EditParticipantResponse;

export const useEditParticipant = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: editParticipant } = useMutation({
        mutationFn: editParticipantRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getAllParticipantsQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { editParticipant };
};
