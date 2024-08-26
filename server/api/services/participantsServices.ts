import { asc, eq } from "drizzle-orm";
import { db } from "../../db";
import { participants } from "../../db/models";
import type {
    ParticipantInsert,
    ParticipantUpdate,
} from "../../db/models/schema";

export const getAllParticipantsService = async () =>
    await db.query.participants.findMany({
        orderBy: asc(participants.id),
    });

export const getParticipantService = async (id: string) =>
    await db.query.participants.findFirst({
        where: eq(participants.id, id),
    });

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
