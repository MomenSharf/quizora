/*
  Warnings:

  - You are about to drop the column `publishedVersion` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `key` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Quiz_status_idx";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "publishedVersion",
DROP COLUMN "status",
DROP COLUMN "version";
