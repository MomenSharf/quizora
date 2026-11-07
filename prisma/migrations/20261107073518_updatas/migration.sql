/*
  Warnings:

  - Added the required column `timeLimitSeconds` to the `AttemptQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AttemptQuestion" ADD COLUMN     "timeLimitSeconds" INTEGER NOT NULL;
