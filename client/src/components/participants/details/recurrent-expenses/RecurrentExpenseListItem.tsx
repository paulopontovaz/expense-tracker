import { EditIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Text } from "@chakra-ui/react";
import type { RecurrentExpense } from "../../../../../../server/db/models/schema";

type RecurrentExpenseListItemProps = {
    recurrentExpense: RecurrentExpense;
    onEditClick: (recurrentExpense: RecurrentExpense) => void;
};

export function RecurrentExpenseListItem(props: RecurrentExpenseListItemProps) {
    const { recurrentExpense, onEditClick } = props;

    return (
        <HStack
            w="full"
            spacing={3}
            justifyContent="space-between"
            borderBottomWidth={1}
        >
            <Text flex={8}>{recurrentExpense.description}</Text>
            <Text flex={1}>{recurrentExpense.price.toFixed(2)}</Text>
            <Text flex={1}>{recurrentExpense.frequency}</Text>
            <Text flex={1}>
                {(recurrentExpense.price / recurrentExpense.frequency).toFixed(
                    2,
                )}
            </Text>
            <IconButton
                variant="ghost"
                w="fit-content"
                icon={<EditIcon />}
                aria-label={`Edit Recurrent Expense "${recurrentExpense.description}"`}
                onClick={() => onEditClick(recurrentExpense)}
            />
        </HStack>
    );
}
