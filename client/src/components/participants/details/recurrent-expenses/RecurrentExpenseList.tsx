import { Button, VStack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import type { RecurrentExpense } from "../../../../../../server/db/models/schema";
import { RecurrentExpenseListItem } from "./RecurrentExpenseListItem";
import { RecurrentExpenseModal } from "./RecurrentExpenseModal";

type RecurrentExpenseListProps = {
    participantId: string;
    recurrentExpenses: RecurrentExpense[];
};

export function RecurrentExpenseList(props: RecurrentExpenseListProps) {
    const { participantId, recurrentExpenses } = props;

    const { isOpen, onClose, onOpen } = useDisclosure();
    const [currentRecurrentExpense, setRecurrentExpense] =
        useState<RecurrentExpense | null>(null);

    const handleOnOpen = (recurrentExpense?: RecurrentExpense) => {
        if (recurrentExpense) {
            setRecurrentExpense(recurrentExpense);
        } else {
            setRecurrentExpense(null);
        }
        onOpen();
    };

    const handleOnClose = () => {
        onClose();
        setRecurrentExpense(null);
    };

    return (
        <VStack
            w="full"
            spacing={6}
            borderWidth={1}
            padding={6}
            borderRadius={6}
        >
            <Button w="full" onClick={() => handleOnOpen()}>
                Add Recurrent Expense
            </Button>
            {recurrentExpenses.map((recurrentExpense) => (
                <RecurrentExpenseListItem
                    key={recurrentExpense.id}
                    onEditClick={handleOnOpen}
                    recurrentExpense={recurrentExpense}
                />
            ))}
            {isOpen && (
                <RecurrentExpenseModal
                    isOpen={isOpen}
                    onClose={handleOnClose}
                    recurrentExpense={currentRecurrentExpense}
                    participantId={participantId}
                />
            )}
        </VStack>
    );
}
