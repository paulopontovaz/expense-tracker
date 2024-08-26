CREATE TABLE IF NOT EXISTS "participants" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"income" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recurrent_expenses" (
	"id" uuid PRIMARY KEY NOT NULL,
	"description" varchar(100) NOT NULL,
	"price" real NOT NULL,
	"frequency" integer DEFAULT 1 NOT NULL,
	"participant_id" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recurrent_expenses" ADD CONSTRAINT "recurrent_expenses_participant_id_participants_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."participants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
