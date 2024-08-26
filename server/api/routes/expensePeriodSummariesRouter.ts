import { Hono } from "hono";
import {
    deleteExpensePeriodSummaryService,
    getAllExpensePeriodSummariesService,
    getExpensePeriodSummaryService,
    insertExpensePeriodSummaryService,
    updateExpensePeriodSummaryService,
} from "../services";

const expensePeriodSummariesRouter = new Hono();

expensePeriodSummariesRouter.get("/", async (c) => {
    try {
        const expensePeriodSummaries =
            await getAllExpensePeriodSummariesService();
        return c.json({ expensePeriodSummaries }, 200);
    } catch (error) {
        c.json({ error: "Error while getting expense period summaries." }, 500);
    }
});

expensePeriodSummariesRouter.get("/:id", async (c) => {
    try {
        const expenseEntryId = c.req.param("id");
        const expenseEntry =
            await getExpensePeriodSummaryService(expenseEntryId);
        return c.json({ expenseEntry }, 200);
    } catch (error) {
        c.json({ error: "Error while getting expense period summary." }, 500);
    }
});

expensePeriodSummariesRouter.post("/", async (c) => {
    try {
        const newExpensePeriodSummaryProperties = await c.req.json();
        const newExpensePeriodSummary = await insertExpensePeriodSummaryService(
            newExpensePeriodSummaryProperties,
        );
        return c.json({ newExpensePeriodSummary }, 201);
    } catch (error) {
        c.json(
            { error: "Error while inserting new expense period summary." },
            500,
        );
    }
});

expensePeriodSummariesRouter.patch("/:id", async (c) => {
    try {
        const updatedExpensePeriodSummaryId = c.req.param("id");
        const updatedFields = await c.req.json();
        const updatedExpensePeriodSummary =
            await updateExpensePeriodSummaryService({
                id: updatedExpensePeriodSummaryId,
                ...updatedFields,
            });
        return c.json({ updatedExpensePeriodSummary }, 200);
    } catch (error) {
        c.json({ error: "Error while updating expense period summary." }, 500);
    }
});

expensePeriodSummariesRouter.delete("/:id", async (c) => {
    try {
        const deletedExpensePeriodSummaryId = c.req.param("id");
        await deleteExpensePeriodSummaryService(deletedExpensePeriodSummaryId);
        return c.json({ deletedExpensePeriodSummaryId }, 200);
    } catch (error) {
        c.json({ error: "Error while deleting expense period summary." }, 500);
    }
});

export { expensePeriodSummariesRouter };
