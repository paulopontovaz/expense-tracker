import { extendTheme } from "@chakra-ui/react";
import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";

import { App } from "./components/App";
import { ExpenseSummary } from "./components/expense-summary/ExpenseSummary";
import { ParticipantDetails } from "./components/participants/details/ParticipantDetails";
import { Participants } from "./components/participants/list/Participants";

export const theme = extendTheme({
    config: {
        initialColorMode: "dark",
    },
});

export const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            retry: 0,
        },
        queries: {
            retry: 0,
        },
    },
});

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/participants",
                element: <Participants />,
            },
            {
                path: "/participants/:participantId",
                element: <ParticipantDetails />,
            },
            {
                path: "/expense-summary",
                element: <ExpenseSummary />,
            },
        ],
    },
]);
