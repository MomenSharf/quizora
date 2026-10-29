/*
  Warnings:

  - The values [SUBMITTING,FEEDBACK] on the enum `QuizAttemptPhase` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QuizAttemptPhase_new" AS ENUM ('READY', 'QUESTION', 'PAUSED', 'RESULT');
ALTER TABLE "public"."QuizAttempt" ALTER COLUMN "phase" DROP DEFAULT;
ALTER TABLE "QuizAttempt" ALTER COLUMN "phase" TYPE "QuizAttemptPhase_new" USING ("phase"::text::"QuizAttemptPhase_new");
ALTER TYPE "QuizAttemptPhase" RENAME TO "QuizAttemptPhase_old";
ALTER TYPE "QuizAttemptPhase_new" RENAME TO "QuizAttemptPhase";
DROP TYPE "public"."QuizAttemptPhase_old";
ALTER TABLE "QuizAttempt" ALTER COLUMN "phase" SET DEFAULT 'READY';
COMMIT;

-- AlterTable
ALTER TABLE "AttemptQuestion" ADD COLUMN     "flagged" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "locked" BOOLEAN NOT NULL DEFAULT false;
