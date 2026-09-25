/*
  Warnings:

  - You are about to drop the column `appearance` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `settings` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "appearance",
DROP COLUMN "settings";
