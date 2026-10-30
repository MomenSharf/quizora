/*
  Warnings:

  - You are about to drop the column `answerKeySnapshot` on the `AttemptQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `mode` on the `QuizAttempt` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "QuizAttempt_userId_mode_status_idx";

-- AlterTable
ALTER TABLE "AttemptQuestion" DROP COLUMN "answerKeySnapshot";

-- AlterTable
ALTER TABLE "QuizAttempt" DROP COLUMN "mode";

-- DropEnum
DROP TYPE "QuizAttemptMode";
