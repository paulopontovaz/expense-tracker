import { Hono } from "hono";
import {
    deleteExpenseEntryService,
    getAllExpenseEntriesService,
    getExpenseEntryService,
    insertExpenseEntryService,
    updateExpenseEntryService,
} from "../services";

const expenseEntriesRouter = new Hono();

expenseEntriesRouter.get("/", async (c) => {
    try {
        const expenseEntries = await getAllExpenseEntriesService();
        return c.json({ expenseEntries }, 200);
    } catch (error) {
        c.json({ error: "Error while getting expenseEntries." }, 500);
    }
});

expenseEntriesRouter.get("/:id", async (c) => {
    try {
        const expenseEntryId = c.req.param("id");
        const expenseEntry = await getExpenseEntryService(expenseEntryId);
        return c.json({ expenseEntry }, 200);
    } catch (error) {
        c.json({ error: "Error while getting expense entry." }, 500);
    }
});

expenseEntriesRouter.post("/", async (c) => {
    try {
        const newExpenseEntryProperties = await c.req.json();
        const newExpenseEntry = await insertExpenseEntryService(
            newExpenseEntryProperties,
        );
        return c.json({ newExpenseEntry }, 201);
    } catch (error) {
        c.json({ error: "Error while inserting new expense entry." }, 500);
    }
});

expenseEntriesRouter.patch("/:id", async (c) => {
    try {
        const updatedExpenseEntryId = c.req.param("id");
        const updatedFields = await c.req.json();
        const updatedExpenseEntry = await updateExpenseEntryService({
            id: updatedExpenseEntryId,
            ...updatedFields,
        });
        return c.json({ updatedExpenseEntry }, 200);
    } catch (error) {
        c.json({ error: "Error while updating expense entry." }, 500);
    }
});

expenseEntriesRouter.delete("/:id", async (c) => {
    try {
        const deletedExpenseEntryId = c.req.param("id");
        await deleteExpenseEntryService(deletedExpenseEntryId);
        return c.json({ deletedExpenseEntryId }, 200);
    } catch (error) {
        c.json({ error: "Error while deleting expense entry." }, 500);
    }
});

export { expenseEntriesRouter };
