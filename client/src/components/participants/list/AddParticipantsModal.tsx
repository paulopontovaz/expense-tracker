import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack,
} from "@chakra-ui/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAddParticipant } from "../../../services";

const schema = yup.object({
    name: yup.string().required("Name is required"),
    income: yup.number().required("Income is required"),
});
type AddParticipantFormData = yup.InferType<typeof schema>;

type AddParticipantsModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function AddParticipantsModal(props: AddParticipantsModalProps) {
    const { isOpen, onClose } = props;
    const {
        register,
        handleSubmit: handleFormSubmit,
        reset,
    } = useForm<AddParticipantFormData>();
    const { addParticipant } = useAddParticipant();

    const handleSubmit: SubmitHandler<AddParticipantFormData> = async (
        data,
    ) => {
        await addParticipant(data);
        reset();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleFormSubmit(handleSubmit)}>
                <ModalHeader>Add Participant</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={3}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input {...register("name")} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Income</FormLabel>
                            <Input
                                type="number"
                                {...register("income", { valueAsNumber: true })}
                            />
                        </FormControl>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" colorScheme="blue">
                        Add
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
