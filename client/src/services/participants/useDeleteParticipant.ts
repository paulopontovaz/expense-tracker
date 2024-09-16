import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../_common";
import { getAllParticipantsQueryKey } from "./useGetAllParticipants";

export const deleteParticipantRequest = async (
    participantId: string,
): Promise<number> =>
    (await api.delete(`participants/${participantId}`).json()) as number;

export const useDeleteParticipant = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: deleteParticipant } = useMutation({
        mutationFn: deleteParticipantRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getAllParticipantsQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { deleteParticipant };
};
