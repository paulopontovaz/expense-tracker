import { asc, eq } from "drizzle-orm";
import { db } from "../../db";
import { participants } from "../../db/models";
import type {
    ParticipantInsert,
    ParticipantUpdate,
} from "../../db/models/schema";

export type GetAllParticipantsServiceReturnType = Awaited<
    ReturnType<typeof getAllParticipantsService>
>;

export const getAllParticipantsService = async () => {
    try {
        const participantList = await db.query.participants.findMany({
            orderBy: asc(participants.id),
            with: {
                recurrentExpenses: {
                    orderBy: ({ frequency, price }, { asc }) => [
                        asc(frequency),
                        asc(price),
                    ],
                },
            },
        });

        return participantList;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        }

        throw new Error(`An unknown error occurred: ${error}`);
    }
};

export const getParticipantService = async (id: string) => {
    try {
        const participant = await db.query.participants.findFirst({
            where: eq(participants.id, id),
            with: {
                recurrentExpenses: true,
            },
        });

        return participant;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error;
        }

        throw new Error(`An unknown error occurred: ${error}`);
    }
};

export const insertParticipantService = async (
    newParticipant: ParticipantInsert,
) =>
    await db
        .insert(participants)
        .values(newParticipant)
        .returning({ id: participants.id });

export const updateParticipantService = async (
    updatedParticipant: ParticipantUpdate,
) =>
    await db
        .update(participants)
        .set(updatedParticipant)
        .where(eq(participants.id, updatedParticipant.id))
        .returning({
            id: participants.id,
            name: participants.name,
            income: participants.income,
        });

export const deleteParticipantService = async (id: string) =>
    await db
        .delete(participants)
        .where(eq(participants.id, id))
        .returning({ id: participants.id });
