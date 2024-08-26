import { asc, eq } from "drizzle-orm";
import { db } from "../../db";
import { recurrentExpenses } from "../../db/models";
import type {
    RecurrentExpenseInsert,
    RecurrentExpenseUpdate,
} from "../../db/models/schema";

export const getAllRecurrentExpensesService = async () =>
    await db.query.recurrentExpenses.findMany({
        orderBy: asc(recurrentExpenses.description),
    });

export const getRecurrentExpenseService = async (id: string) =>
    await db.query.recurrentExpenses.findFirst({
        where: eq(recurrentExpenses.id, id),
    });

export const insertRecurrentExpenseService = async (
    newRecurrentExpense: RecurrentExpenseInsert,
) =>
    await db
        .insert(recurrentExpenses)
        .values(newRecurrentExpense)
        .returning({ id: recurrentExpenses.id });

export const updateRecurrentExpenseService = async (
    updatedRecurrentExpense: RecurrentExpenseUpdate,
) =>
    await db
        .update(recurrentExpenses)
        .set(updatedRecurrentExpense)
        .where(eq(recurrentExpenses.id, updatedRecurrentExpense.id))
        .returning({
            id: recurrentExpenses.id,
            description: recurrentExpenses.description,
            price: recurrentExpenses.price,
            frequency: recurrentExpenses.frequency,
        });

export const deleteRecurrentExpenseService = async (id: string) =>
    await db
        .delete(recurrentExpenses)
        .where(eq(recurrentExpenses.id, id))
        .returning({ id: recurrentExpenses.id });
