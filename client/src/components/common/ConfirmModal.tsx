import {
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";

type DeletePostModalProps = {
    title: string;
    text: string;
    isOpen: boolean;
    onConfirm: () => void;
    onClose: () => void;
};

export const ConfirmModal = (props: DeletePostModalProps) => {
    const { isOpen, onClose, onConfirm, title, text } = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent data-testid="confirm-modal-content">
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Text>{text}</Text>
                </ModalBody>

                <ModalFooter>
                    <HStack w="full" spacing={3} justifyContent="flex-end">
                        <Button colorScheme="blue" onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost" onClick={onConfirm}>
                            Confirm
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
