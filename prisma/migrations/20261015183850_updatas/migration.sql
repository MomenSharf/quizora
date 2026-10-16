/*
  Warnings:

  - The values [flashcard] on the enum `QuestionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "QuizAttemptMode" AS ENUM ('PRACTICE', 'TEST');

-- CreateEnum
CREATE TYPE "QuizAttemptStatus" AS ENUM ('IN_PROGRESS', 'PAUSED', 'COMPLETED', 'ABANDONED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "AttemptQuestionStatus" AS ENUM ('UNANSWERED', 'ANSWERED', 'SKIPPED');

-- AlterEnum
BEGIN;
CREATE TYPE "QuestionType_new" AS ENUM ('SINGLE_SELECT', 'MULTIPLE_SELECT', 'TRUE_FALSE', 'ORDERING', 'MATCH', 'TYPE_ANSWER', 'FILL_BLANK', 'RANGE', 'GUESS', 'FLASHCARD', 'TAP_FIND', 'DROPDOWN');
ALTER TABLE "Question" ALTER COLUMN "type" TYPE "QuestionType_new" USING ("type"::text::"QuestionType_new");
ALTER TYPE "QuestionType" RENAME TO "QuestionType_old";
ALTER TYPE "QuestionType_new" RENAME TO "QuestionType";
DROP TYPE "public"."QuestionType_old";
COMMIT;

-- CreateTable
CREATE TABLE "QuizAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "mode" "QuizAttemptMode" NOT NULL,
    "status" "QuizAttemptStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "quizTitle" TEXT NOT NULL,
    "quizSnapshot" JSONB NOT NULL,
    "settings" JSONB NOT NULL,
    "currentQuestionIndex" INTEGER NOT NULL DEFAULT 0,
    "totalQuestions" INTEGER NOT NULL DEFAULT 0,
    "answeredQuestions" INTEGER NOT NULL DEFAULT 0,
    "correctAnswers" INTEGER NOT NULL DEFAULT 0,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalPoints" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "timeLimitSeconds" INTEGER,
    "elapsedSeconds" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pausedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttemptQuestion" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "questionId" TEXT,
    "orderIndex" INTEGER NOT NULL,
    "questionSnapshot" JSONB NOT NULL,
    "answerKeySnapshot" JSONB NOT NULL,
    "response" JSONB,
    "isSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "status" "AttemptQuestionStatus" NOT NULL DEFAULT 'UNANSWERED',
    "evaluation" JSONB,
    "earnedPoints" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "timeSpentSeconds" INTEGER NOT NULL DEFAULT 0,
    "answeredAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AttemptQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuizAttempt_userId_status_idx" ON "QuizAttempt"("userId", "status");

-- CreateIndex
CREATE INDEX "QuizAttempt_quizId_userId_createdAt_idx" ON "QuizAttempt"("quizId", "userId", "createdAt");

-- CreateIndex
CREATE INDEX "QuizAttempt_userId_mode_status_idx" ON "QuizAttempt"("userId", "mode", "status");

-- CreateIndex
CREATE INDEX "AttemptQuestion_attemptId_status_idx" ON "AttemptQuestion"("attemptId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "AttemptQuestion_attemptId_orderIndex_key" ON "AttemptQuestion"("attemptId", "orderIndex");

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttemptQuestion" ADD CONSTRAINT "AttemptQuestion_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "QuizAttempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
