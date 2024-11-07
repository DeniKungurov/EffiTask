-- AlterTable
ALTER TABLE "BusinessEntity" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "BusinessEntityType" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Relation" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RelationType" ALTER COLUMN "updatedAt" DROP NOT NULL;
