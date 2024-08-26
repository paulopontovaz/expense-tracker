import { Hono } from "hono";
import {
    deleteRecurrentExpenseService,
    getAllRecurrentExpensesService,
    getRecurrentExpenseService,
    insertRecurrentExpenseService,
    updateRecurrentExpenseService,
} from "../services";

const recurrentExpensesRouter = new Hono();

recurrentExpensesRouter.get("/", async (c) => {
    try {
        const recurrentExpenses = await getAllRecurrentExpensesService();
        return c.json({ recurrentExpenses }, 200);
    } catch (error) {
        c.json({ error: "Error while getting recurrent expenses." }, 500);
    }
});

recurrentExpensesRouter.get("/:id", async (c) => {
    try {
        const recurrentExpenseId = c.req.param("id");
        const recurrentExpense =
            await getRecurrentExpenseService(recurrentExpenseId);
        return c.json({ recurrentExpense }, 200);
    } catch (error) {
        c.json({ error: "Error while getting recurrent expense." }, 500);
    }
});

recurrentExpensesRouter.post("/", async (c) => {
    try {
        const newRecurrentExpenseProperties = await c.req.json();
        const newRecurrentExpense = await insertRecurrentExpenseService(
            newRecurrentExpenseProperties,
        );
        return c.json({ newRecurrentExpense }, 201);
    } catch (error) {
        c.json({ error: "Error while inserting new recurrent expense." }, 500);
    }
});

recurrentExpensesRouter.patch("/:id", async (c) => {
    try {
        const updatedRecurrentExpenseId = c.req.param("id");
        const updatedFields = await c.req.json();
        const updatedRecurrentExpense = await updateRecurrentExpenseService({
            id: updatedRecurrentExpenseId,
            ...updatedFields,
        });
        return c.json({ updatedRecurrentExpense }, 200);
    } catch (error) {
        c.json({ error: "Error while updating recurrent expense." }, 500);
    }
});

recurrentExpensesRouter.delete("/:id", async (c) => {
    try {
        const deletedRecurrentExpenseId = c.req.param("id");
        await deleteRecurrentExpenseService(deletedRecurrentExpenseId);
        return c.json({ deletedRecurrentExpenseId }, 200);
    } catch (error) {
        c.json({ error: "Error while deleting recurrent expense." }, 500);
    }
});

export { recurrentExpensesRouter };
