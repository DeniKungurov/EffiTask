INSERT INTO "public"."RelationType"("code") VALUES ('member') ON CONFLICT DO NOTHING;
INSERT INTO "public"."RelationType"("code") VALUES ('admin') ON CONFLICT DO NOTHING;
INSERT INTO "public"."RelationType"("code") VALUES ('user') ON CONFLICT DO NOTHING;