-- CreateEnum
CREATE TYPE "QuizAttemptPhase" AS ENUM ('READY', 'QUESTION', 'SUBMITTING', 'FEEDBACK', 'PAUSED', 'RESULT');

-- AlterTable
ALTER TABLE "QuizAttempt" ADD COLUMN     "phase" "QuizAttemptPhase" NOT NULL DEFAULT 'READY';
