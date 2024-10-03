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
import { yupResolver } from "@hookform/resolvers/yup";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import type { Participant } from "../../../../server/db/models/schema";
import { useAddParticipant, useEditParticipant } from "../../services";

const schema = yup.object({
    name: yup.string().required("Name is required"),
    income: yup.number().required("Income is required"),
});
type ParticipantFormData = yup.InferType<typeof schema>;

type ParticipantModalProps = {
    isOpen: boolean;
    onClose: () => void;
    participant: Participant | null;
};

export function ParticipantModal(props: ParticipantModalProps) {
    const { isOpen, onClose, participant } = props;
    const {
        register,
        handleSubmit: handleFormSubmit,
        reset,
    } = useForm<ParticipantFormData>({
        resolver: yupResolver(schema),
        values: participant
            ? {
                  name: participant.name,
                  income: participant.income,
              }
            : undefined,
    });
    const { addParticipant } = useAddParticipant();
    const { editParticipant } = useEditParticipant();

    const handleOnClose = () => {
        reset();
        onClose();
    };

    const handleSubmit: SubmitHandler<ParticipantFormData> = async (data) => {
        if (participant) {
            await editParticipant({ ...data, id: participant.id });
        } else {
            await addParticipant(data);
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
                    {`${participant ? "Edit" : "Add"}`} Participant
                </ModalHeader>
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
