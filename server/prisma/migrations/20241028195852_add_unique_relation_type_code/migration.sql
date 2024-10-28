/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `RelationType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RelationType_code_key" ON "RelationType"("code");
