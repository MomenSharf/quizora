-- AlterTable
ALTER TABLE "AttemptQuestion" ADD COLUMN     "deadlineAt" TIMESTAMP(3),
ADD COLUMN     "isQuestionTimerRunning" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "startedAt" TIMESTAMP(3);
