-- CreateEnum
CREATE TYPE "RuntimeEnvironment" AS ENUM ('PREVIEW', 'PRODUCTION');

-- AlterTable
ALTER TABLE "AttemptQuestion" ADD COLUMN     "maxPoints" DOUBLE PRECISION NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "QuizAttempt" ADD COLUMN     "environment" "RuntimeEnvironment" NOT NULL DEFAULT 'PRODUCTION',
ADD COLUMN     "partiallyCorrectAnswers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "skippedQuestions" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "AttemptQuestion_questionId_idx" ON "AttemptQuestion"("questionId");

-- CreateIndex
CREATE INDEX "QuizAttempt_lastActivityAt_idx" ON "QuizAttempt"("lastActivityAt");
