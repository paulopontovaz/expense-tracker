import { asc, eq } from "drizzle-orm";
import { db } from "../../db";
import { expensePeriodSummaries } from "../../db/models";
import type {
    ExpensePeriodSummaryInsert,
    ExpensePeriodSummaryUpdate,
} from "../../db/models/schema";

export const getAllExpensePeriodSummariesService = async () =>
    await db.query.expensePeriodSummaries.findMany({
        orderBy: asc(expensePeriodSummaries.description),
    });

export const getExpensePeriodSummaryService = async (id: string) =>
    await db.query.expensePeriodSummaries.findFirst({
        where: eq(expensePeriodSummaries.id, id),
    });

export const insertExpensePeriodSummaryService = async (
    newExpensePeriodSummary: ExpensePeriodSummaryInsert,
) =>
    await db
        .insert(expensePeriodSummaries)
        .values(newExpensePeriodSummary)
        .returning({ id: expensePeriodSummaries.id });

export const updateExpensePeriodSummaryService = async (
    updatedExpensePeriodSummary: ExpensePeriodSummaryUpdate,
) =>
    await db
        .update(expensePeriodSummaries)
        .set(updatedExpensePeriodSummary)
        .where(eq(expensePeriodSummaries.id, updatedExpensePeriodSummary.id))
        .returning({
            id: expensePeriodSummaries.id,
            description: expensePeriodSummaries.description,
            startTime: expensePeriodSummaries.startTime,
            endTime: expensePeriodSummaries.endTime,
        });

export const deleteExpensePeriodSummaryService = async (id: string) =>
    await db
        .delete(expensePeriodSummaries)
        .where(eq(expensePeriodSummaries.id, id))
        .returning({ id: expensePeriodSummaries.id });
