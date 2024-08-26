import { Hono } from "hono";
import { cors } from "hono/cors";
import {
    expenseEntriesRouter,
    expensePeriodSummariesRouter,
    participantsRouter,
    recurrentExpensesRouter,
} from "./routes";

const server = new Hono().basePath("/api");

if (process.env.NODE_ENV === "dev") {
    server.use(cors());
}
server.route("/expense-entries", expenseEntriesRouter);
server.route("/expense-period-summaries", expensePeriodSummariesRouter);
server.route("/participants", participantsRouter);
server.route("/recurrent-expenses", recurrentExpensesRouter);

export { server };
