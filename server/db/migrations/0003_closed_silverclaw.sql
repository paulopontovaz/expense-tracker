ALTER TABLE "recurrent_expenses" DROP CONSTRAINT "recurrent_expenses_participant_id_participants_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recurrent_expenses" ADD CONSTRAINT "recurrent_expenses_participant_id_participants_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."participants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
