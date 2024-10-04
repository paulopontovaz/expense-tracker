import { relations } from "drizzle-orm";
import {
    boolean,
    integer,
    pgTable,
    real,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";

type EntityUpdate<E extends { id: string }> = Omit<
    Partial<E> & Pick<E, "id">,
    ""
>;

export const participants = pgTable("participants", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    income: real("income").notNull(),
});

export type Participant = typeof participants.$inferSelect;
export type ParticipantInsert = typeof participants.$inferInsert;
export type ParticipantUpdate = EntityUpdate<Participant>;

export const participantRelations = relations(participants, ({ many }) => ({
    recurrentExpenses: many(recurrentExpenses),
}));

export const recurrentExpenses = pgTable("recurrent_expenses", {
    id: uuid("id").defaultRandom().primaryKey(),
    description: varchar("description", { length: 100 }).notNull(),
    price: real("price").notNull(),
    frequency: integer("frequency").notNull().default(1),
    participantId: uuid("participant_id")
        .notNull()
        .references(() => participants.id, { onDelete: "cascade" }),
});

export type RecurrentExpense = typeof recurrentExpenses.$inferSelect;
export type RecurrentExpenseInsert = typeof recurrentExpenses.$inferInsert;
export type RecurrentExpenseUpdate = EntityUpdate<RecurrentExpense>;

export const recurrentExpensesRelations = relations(
    recurrentExpenses,
    ({ one }) => ({
        participant: one(participants, {
            fields: [recurrentExpenses.participantId],
            references: [participants.id],
        }),
    }),
);

export const expensePeriodSummaries = pgTable("expense_period_summaries", {
    id: uuid("id").defaultRandom().primaryKey(),
    description: varchar("description", { length: 100 }).notNull(),
    startTime: timestamp("start_time").notNull(),
    endTime: timestamp("end_time").notNull(),
});

export type ExpensePeriodSummary = typeof expensePeriodSummaries.$inferSelect;
export type ExpensePeriodSummaryInsert =
    typeof expensePeriodSummaries.$inferInsert;
export type ExpensePeriodSummaryUpdate = EntityUpdate<ExpensePeriodSummary>;

export const expensePeriodSummariesRelations = relations(
    expensePeriodSummaries,
    ({ many }) => ({
        expenseEntries: many(expenseEntries),
    }),
);

export const expenseEntries = pgTable("expense_entries", {
    id: uuid("id").defaultRandom().primaryKey(),
    description: varchar("description", { length: 100 }).notNull(),
    price: real("price").notNull(),
    paid: boolean("paid").notNull().default(false),
    expensePeriodSummaryId: uuid("expense_period_summary_id")
        .notNull()
        .references(() => expensePeriodSummaries.id),
});

export type ExpenseEntry = typeof expenseEntries.$inferSelect;
export type ExpenseEntryInsert = typeof expenseEntries.$inferInsert;
export type ExpenseEntryUpdate = EntityUpdate<ExpenseEntry>;

export const expenseEntriesRelations = relations(expenseEntries, ({ one }) => ({
    author: one(expensePeriodSummaries, {
        fields: [expenseEntries.expensePeriodSummaryId],
        references: [expensePeriodSummaries.id],
    }),
}));
