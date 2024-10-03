import { Button, HStack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import type { Participant } from "../../../../../server/db/models/schema";
import { ParticipantModal } from "../ParticipantModal";
import { ParticipantList } from "./ParticipantList";

export function Participants() {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [currentParticipant, setParticipant] = useState<Participant | null>(
        null,
    );

    const handleOnOpen = (participant?: Participant) => {
        if (participant) {
            setParticipant(participant);
        } else {
            setParticipant(null);
        }
        onOpen();
    };

    const handleOnClose = () => {
        onClose();
        setParticipant(null);
    };

    return (
        <VStack w="full" h="full" spacing={4}>
            <HStack w="full" justifyContent="space-between">
                <Text>Participants</Text>
                <Button onClick={() => handleOnOpen()}>Add Participant</Button>
            </HStack>
            <ParticipantList onOpen={handleOnOpen} />
            {isOpen && (
                <ParticipantModal
                    isOpen={isOpen}
                    onClose={handleOnClose}
                    participant={currentParticipant}
                />
            )}
        </VStack>
    );
}
