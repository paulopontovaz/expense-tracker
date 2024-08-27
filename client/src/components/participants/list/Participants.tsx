import { Button, HStack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { AddParticipantsModal } from "./AddParticipantsModal";
import { ParticipantList } from "./ParticipantList";

export function Participants() {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <VStack w="full" h="full" spacing={4}>
            <HStack w="full" justifyContent="space-between">
                <Text>Participants</Text>
                <Button onClick={onOpen}>Add Participant</Button>
            </HStack>
            <ParticipantList />
            <AddParticipantsModal isOpen={isOpen} onClose={onClose} />
        </VStack>
    );
}
