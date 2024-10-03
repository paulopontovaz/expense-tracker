import { Button, HStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export function NavMenu() {
    return (
        <HStack
            as="nav"
            spacing={4}
            p={3}
            justifyContent="center"
            alignItems="center"
        >
            <Button as={NavLink} to="/participants" variant="ghost">
                Participants
            </Button>
            <Button as={NavLink} to="/expense-summary" variant="ghost">
                Expense Summary
            </Button>
        </HStack>
    );
}
