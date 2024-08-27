import { Box, HStack, Heading, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { NavMenu } from "./NavMenu";

export function App() {
    return (
        <VStack w="full" h="full" spacing={4}>
            <HStack w="full" p={3} spacing={3} justifyContent="space-between">
                <Heading as="h1" textAlign="center" fontSize="xx-large">
                    Expense Tracker
                </Heading>
                <NavMenu />
            </HStack>
            <Box w="full" maxW="1278px" p={4}>
                <Outlet />
            </Box>
        </VStack>
    );
}
