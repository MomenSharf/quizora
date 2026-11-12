/*
  Warnings:

  - You are about to drop the column `averageRating` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `ratingCount` on the `Quiz` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Quiz_visibility_averageRating_idx";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "averageRating",
DROP COLUMN "ratingCount";
