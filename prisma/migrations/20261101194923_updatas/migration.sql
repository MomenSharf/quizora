/*
  Warnings:

  - You are about to drop the column `isSubmitted` on the `AttemptQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `response` on the `AttemptQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `settings` on the `QuizAttempt` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "QuizAttemptMode" AS ENUM ('STANDARD', 'REVIEW', 'TIMED');

-- AlterTable
ALTER TABLE "AttemptQuestion" DROP COLUMN "isSubmitted",
DROP COLUMN "response",
ADD COLUMN     "answer" JSONB,
ADD COLUMN     "hasSeenFeedback" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "visited" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "QuizAttempt" DROP COLUMN "settings",
ADD COLUMN     "mode" "QuizAttemptMode" NOT NULL DEFAULT 'STANDARD',
ADD COLUMN     "showExplanations" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "shuffleAnswers" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "shuffleQuestions" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "QuizAttempt_userId_mode_status_idx" ON "QuizAttempt"("userId", "mode", "status");
