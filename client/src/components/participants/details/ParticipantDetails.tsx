import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
    HStack,
    IconButton,
    Text,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDeleteParticipant, useGetParticipant } from "../../../services";
import { ParticipantModal } from "../ParticipantModal";
import { RecurrentExpenseList } from "./recurrent-expenses/RecurrentExpenseList";

export function ParticipantDetails() {
    const { participantId } = useParams();
    const { participant } = useGetParticipant({ participantId });
    const { deleteParticipant } = useDeleteParticipant();
    const { isOpen, onClose, onOpen } = useDisclosure();

    const montlyPayment =
        participant?.recurrentExpenses.reduce((acc, recurrentExpense) => {
            return acc + recurrentExpense.price / recurrentExpense.frequency;
        }, 0) ?? 0;

    return participant ? (
        <VStack w="full" spacing={12}>
            <HStack w="full" justifyContent="space-between" spacing={3}>
                <VStack alignItems="flex-start">
                    <Text fontWeight="bold" fontSize="xx-large">
                        {participant.name}
                    </Text>
                    <Text pl={4} fontSize="x-large">
                        {`Income (EUR): ${participant.income.toFixed(2)}`}
                    </Text>
                </VStack>
                <HStack>
                    <IconButton
                        icon={<DeleteIcon />}
                        aria-label={`Delete participant '${participant.name}'`}
                        onClick={() => deleteParticipant(participant.id)}
                    />
                    <IconButton
                        icon={<EditIcon />}
                        aria-label={`Edit participant '${participant.name}'`}
                        onClick={onOpen}
                    />
                </HStack>
            </HStack>
            <VStack w="full" alignItems="flex-start">
                <HStack w="full" justifyContent="space-between">
                    <Text fontSize="large">Recurrent Expenses</Text>
                    <Text fontSize="large">{`Monthly Total (EUR): ${montlyPayment.toFixed(2)}`}</Text>
                </HStack>
                <RecurrentExpenseList
                    participantId={participant.id}
                    recurrentExpenses={participant.recurrentExpenses}
                />
            </VStack>
            <ParticipantModal
                isOpen={isOpen}
                participant={participant}
                onClose={onClose}
            />
        </VStack>
    ) : null;
}
