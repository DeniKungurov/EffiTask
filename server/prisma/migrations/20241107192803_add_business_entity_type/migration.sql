INSERT INTO "public"."BusinessEntityType"("code") VALUES ('user') ON CONFLICT DO NOTHING;
INSERT INTO "public"."BusinessEntityType"("code") VALUES ('group') ON CONFLICT DO NOTHING;

