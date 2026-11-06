/*
  Warnings:

  - The values [SKIPPED] on the enum `AttemptQuestionStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [PAUSED] on the enum `QuizAttemptPhase` will be removed. If these variants are still used in the database, this will fail.
  - The values [PAUSED,ABANDONED] on the enum `QuizAttemptStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `answeredQuestions` on the `QuizAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `correctAnswers` on the `QuizAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `elapsedSeconds` on the `QuizAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `partiallyCorrectAnswers` on the `QuizAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `pausedAt` on the `QuizAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `QuizAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `skippedQuestions` on the `QuizAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `totalPoints` on the `QuizAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `totalQuestions` on the `QuizAttempt` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttemptQuestionStatus_new" AS ENUM ('UNANSWERED', 'ANSWERED', 'TIME_OUT');
ALTER TABLE "public"."AttemptQuestion" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "AttemptQuestion" ALTER COLUMN "status" TYPE "AttemptQuestionStatus_new" USING ("status"::text::"AttemptQuestionStatus_new");
ALTER TYPE "AttemptQuestionStatus" RENAME TO "AttemptQuestionStatus_old";
ALTER TYPE "AttemptQuestionStatus_new" RENAME TO "AttemptQuestionStatus";
DROP TYPE "public"."AttemptQuestionStatus_old";
ALTER TABLE "AttemptQuestion" ALTER COLUMN "status" SET DEFAULT 'UNANSWERED';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "QuizAttemptPhase_new" AS ENUM ('READY', 'QUESTION', 'RESULT');
ALTER TABLE "public"."QuizAttempt" ALTER COLUMN "phase" DROP DEFAULT;
ALTER TABLE "QuizAttempt" ALTER COLUMN "phase" TYPE "QuizAttemptPhase_new" USING ("phase"::text::"QuizAttemptPhase_new");
ALTER TYPE "QuizAttemptPhase" RENAME TO "QuizAttemptPhase_old";
ALTER TYPE "QuizAttemptPhase_new" RENAME TO "QuizAttemptPhase";
DROP TYPE "public"."QuizAttemptPhase_old";
ALTER TABLE "QuizAttempt" ALTER COLUMN "phase" SET DEFAULT 'READY';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "QuizAttemptStatus_new" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'EXPIRED');
ALTER TABLE "public"."QuizAttempt" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "QuizAttempt" ALTER COLUMN "status" TYPE "QuizAttemptStatus_new" USING ("status"::text::"QuizAttemptStatus_new");
ALTER TYPE "QuizAttemptStatus" RENAME TO "QuizAttemptStatus_old";
ALTER TYPE "QuizAttemptStatus_new" RENAME TO "QuizAttemptStatus";
DROP TYPE "public"."QuizAttemptStatus_old";
ALTER TABLE "QuizAttempt" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS';
COMMIT;

-- AlterTable
ALTER TABLE "QuizAttempt" DROP COLUMN "answeredQuestions",
DROP COLUMN "correctAnswers",
DROP COLUMN "elapsedSeconds",
DROP COLUMN "partiallyCorrectAnswers",
DROP COLUMN "pausedAt",
DROP COLUMN "score",
DROP COLUMN "skippedQuestions",
DROP COLUMN "totalPoints",
DROP COLUMN "totalQuestions";
