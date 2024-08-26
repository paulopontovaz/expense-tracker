CREATE TABLE IF NOT EXISTS "expense_entries" (
	"id" uuid PRIMARY KEY NOT NULL,
	"description" varchar(100) NOT NULL,
	"price" real NOT NULL,
	"paid" boolean DEFAULT false NOT NULL,
	"expense_period_summary_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "expense_period_summaries" (
	"id" uuid PRIMARY KEY NOT NULL,
	"description" varchar(100) NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "expense_entries" ADD CONSTRAINT "expense_entries_expense_period_summary_id_expense_period_summaries_id_fk" FOREIGN KEY ("expense_period_summary_id") REFERENCES "public"."expense_period_summaries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
