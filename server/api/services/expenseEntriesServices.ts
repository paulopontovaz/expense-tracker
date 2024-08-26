import { asc, eq } from "drizzle-orm";
import { db } from "../../db";
import { expenseEntries } from "../../db/models";
import type {
    ExpenseEntryInsert,
    ExpenseEntryUpdate,
} from "../../db/models/schema";

export const getAllExpenseEntriesService = async () =>
    await db.query.expenseEntries.findMany({
        orderBy: asc(expenseEntries.description),
    });

export const getExpenseEntryService = async (id: string) =>
    await db.query.expenseEntries.findFirst({
        where: eq(expenseEntries.id, id),
    });

export const insertExpenseEntryService = async (
    newExpenseEntry: ExpenseEntryInsert,
) =>
    await db
        .insert(expenseEntries)
        .values(newExpenseEntry)
        .returning({ id: expenseEntries.id });

export const updateExpenseEntryService = async (
    updatedExpenseEntry: ExpenseEntryUpdate,
) =>
    await db
        .update(expenseEntries)
        .set(updatedExpenseEntry)
        .where(eq(expenseEntries.id, updatedExpenseEntry.id))
        .returning({
            id: expenseEntries.id,
            description: expenseEntries.description,
            price: expenseEntries.price,
            paid: expenseEntries.paid,
        });

export const deleteExpenseEntryService = async (id: string) =>
    await db
        .delete(expenseEntries)
        .where(eq(expenseEntries.id, id))
        .returning({ id: expenseEntries.id });
