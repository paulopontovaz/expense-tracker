import { Button, HStack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { ParticipantModal } from "../ParticipantModal";
import { ParticipantList } from "./ParticipantList";

export function Participants() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <VStack w="full" h="full" spacing={4}>
            <HStack w="full" justifyContent="space-between">
                <Text>Participants</Text>
                <Button onClick={() => onOpen()}>Add Participant</Button>
            </HStack>
            <ParticipantList />
            {isOpen && (
                <ParticipantModal
                    isOpen={isOpen}
                    onClose={onClose}
                    participant={null}
                />
            )}
        </VStack>
    );
}
