/*
  Warnings:

  - You are about to drop the column `config` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Question` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Question_difficulty_idx";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "config",
DROP COLUMN "difficulty",
DROP COLUMN "tags",
DROP COLUMN "version";
