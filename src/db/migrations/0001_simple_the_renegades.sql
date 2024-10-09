ALTER TABLE "invoices" DROP CONSTRAINT "invoices_customerId_customers_id_fk";
--> statement-breakpoint
ALTER TABLE "invoices" DROP COLUMN IF EXISTS "userId";--> statement-breakpoint
ALTER TABLE "invoices" DROP COLUMN IF EXISTS "organizationId";--> statement-breakpoint
ALTER TABLE "invoices" DROP COLUMN IF EXISTS "customerId";