import { Hono } from "hono";
import {
    deleteParticipantService,
    getAllParticipantsService,
    getParticipantService,
    insertParticipantService,
    updateParticipantService,
} from "../services";

const participantsRouter = new Hono();

participantsRouter.get("/", async (c) => {
    try {
        const participants = await getAllParticipantsService();
        return c.json({ participants }, 200);
    } catch (error) {
        c.json({ error: "Error while getting participants." }, 500);
    }
});

participantsRouter.get("/:id", async (c) => {
    try {
        const participantId = c.req.param("id");
        const participant = await getParticipantService(participantId);
        return c.json({ participant }, 200);
    } catch (error) {
        c.json({ error: "Error while getting participant." }, 500);
    }
});

participantsRouter.post("/", async (c) => {
    try {
        const newParticipantProperties = await c.req.json();
        const newParticipant = await insertParticipantService(
            newParticipantProperties,
        );
        return c.json({ newParticipant }, 201);
    } catch (error) {
        c.json({ error: "Error while inserting new participant." }, 500);
    }
});

participantsRouter.patch("/:id", async (c) => {
    try {
        const updatedParticipantId = c.req.param("id");
        const updatedFields = await c.req.json();
        const updatedParticipant = await updateParticipantService({
            id: updatedParticipantId,
            ...updatedFields,
        });
        return c.json({ updatedParticipant }, 200);
    } catch (error) {
        c.json({ error: "Error while updating participant." }, 500);
    }
});

participantsRouter.delete("/:id", async (c) => {
    try {
        const deletedParticipantId = c.req.param("id");
        await deleteParticipantService(deletedParticipantId);
        return c.json({ deletedParticipantId }, 200);
    } catch (error) {
        c.json({ error: "Error while deleting participant." }, 500);
    }
});

export { participantsRouter };
