import { Heading, VStack } from "@chakra-ui/react";

function App() {
    return (
        <VStack spacing={4} p={4}>
            <Heading as="h1" w="full" textAlign="center" fontSize="xx-large">
                Expense Tracker
            </Heading>
        </VStack>
    );
}

export default App;
