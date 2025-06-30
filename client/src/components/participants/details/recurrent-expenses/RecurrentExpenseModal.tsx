import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    VStack,
    useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import type { RecurrentExpense } from "../../../../../../server/db/models/schema";
import {
    useAddRecurrentExpense,
    useEditRecurrentExpense,
} from "../../../../services";

const schema = yup.object({
    description: yup.string().required("'Description' is required"),
    price: yup.number().min(0.0).required("'Price' is required"),
    frequency: yup
        .number()
        .oneOf([1, 3, 6, 12])
        .required("'Frequency' is required")
        .label("Frequency"),
});
type RecurrentExpenseFormData = yup.InferType<typeof schema>;

type RecurrentExpenseModalProps = {
    isOpen: boolean;
    onClose: () => void;
    recurrentExpense: RecurrentExpense | null;
    participantId: string;
};

export function RecurrentExpenseModal(props: RecurrentExpenseModalProps) {
    const { isOpen, onClose, recurrentExpense, participantId } = props;
    const {
        register,
        handleSubmit: handleFormSubmit,
        reset,
    } = useForm<RecurrentExpenseFormData>({
        resolver: yupResolver(schema),
        values: recurrentExpense
            ? {
                  description: recurrentExpense.description,
                  price: recurrentExpense.price,
                  frequency: recurrentExpense.frequency,
              }
            : undefined,
    });
    const toast = useToast();
    const { addRecurrentExpense } = useAddRecurrentExpense({ participantId });
    const { editRecurrentExpense } = useEditRecurrentExpense({ participantId });

    const handleOnClose = () => {
        reset();
        onClose();
    };

    const handleSubmit: SubmitHandler<RecurrentExpenseFormData> = async (
        data,
    ) => {
        if (!participantId) {
            console.error("Participant ID not found");
            toast({
                description: "Participant ID not found",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        if (recurrentExpense) {
            await editRecurrentExpense({
                ...data,
                frequency: Number(data.frequency),
                id: recurrentExpense.id,
                participantId,
            });
        } else {
            await addRecurrentExpense({
                ...data,
                participantId,
                frequency: Number(data.frequency),
            });
        }
        handleOnClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleOnClose}
            closeOnOverlayClick={false}
            closeOnEsc={false}
        >
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleFormSubmit(handleSubmit)}>
                <ModalHeader>
                    {`${recurrentExpense ? "Edit" : "Add"}`} Recurrent Expense
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={6}>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input {...register("description")} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Price (EUR)</FormLabel>
                            <Input
                                type="number"
                                step="0.01"
                                {...register("price")}
                                pattern="^\d*\.\d{2}$"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Frequency</FormLabel>
                            <Select {...register("frequency")}>
                                <option value="1">Monthly</option>
                                <option value="3">Quarterly</option>
                                <option value="6">Every semester</option>
                                <option value="12">Yearly</option>
                            </Select>
                            <FormHelperText>
                                How often do you pay for this expense?
                            </FormHelperText>
                        </FormControl>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={handleOnClose}>
                        Cancel
                    </Button>
                    <Button type="submit" colorScheme="blue">
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
