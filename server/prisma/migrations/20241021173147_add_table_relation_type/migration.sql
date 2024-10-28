/*
  Warnings:

  - You are about to drop the column `BusinessEntityId` on the `Relation` table. All the data in the column will be lost.
  - Added the required column `businessEntityId` to the `Relation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relationTypeId` to the `Relation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Relation" DROP CONSTRAINT "Relation_BusinessEntityId_fkey";

-- AlterTable
ALTER TABLE "Relation" DROP COLUMN "BusinessEntityId",
ADD COLUMN     "businessEntityId" INTEGER NOT NULL,
ADD COLUMN     "relationTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "RelationType" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RelationType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Relation" ADD CONSTRAINT "Relation_relationTypeId_fkey" FOREIGN KEY ("relationTypeId") REFERENCES "RelationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relation" ADD CONSTRAINT "Relation_businessEntityId_fkey" FOREIGN KEY ("businessEntityId") REFERENCES "BusinessEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
