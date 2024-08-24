import { relations } from "drizzle-orm";
import { integer, pgTable, real, uuid, varchar } from "drizzle-orm/pg-core";

export const participants = pgTable("participants", {
    id: uuid("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    income: real("income").notNull(),
});

export const participantRelations = relations(participants, ({ many }) => ({
    recurrentExpenses: many(recurrentExpenses),
}));

export type Participant = typeof participants.$inferSelect;
export type ParticipantInsert = typeof participants.$inferInsert;
export type ParticipantUpdate = Omit<
    Partial<Participant> & Pick<Participant, "id">,
    ""
>;

export const recurrentExpenses = pgTable("participants", {
    id: uuid("id").primaryKey(),
    description: varchar("description", { length: 100 }).notNull(),
    price: real("price").notNull(),
    frequency: integer("frequency").notNull().default(1),
    participantId: uuid("participant_id")
        .notNull()
        .references(() => participants.id),
});

export const recurrentExpensesRelations = relations(
    recurrentExpenses,
    ({ one }) => ({
        participant: one(participants, {
            fields: [recurrentExpenses.participantId],
            references: [participants.id],
        }),
    }),
);

export type RecurrentExpense = typeof recurrentExpenses.$inferSelect;
export type RecurrentExpenseInsert = typeof recurrentExpenses.$inferInsert;
export type RecurrentExpenseUpdate = Omit<
    Partial<RecurrentExpense> & Pick<RecurrentExpense, "id">,
    ""
>;
