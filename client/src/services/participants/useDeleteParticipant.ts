import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../_common";
import { getParticipantsQueryKey } from "./useGetAllParticipants";

export const deleteParticipantRequest = async (
    participantId: number,
): Promise<number> =>
    (await api.delete(`/participants/${participantId}`).json()) as number;

export const useDeleteParticipant = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: deleteParticipant } = useMutation({
        mutationFn: deleteParticipantRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getParticipantsQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { deleteParticipant };
};
