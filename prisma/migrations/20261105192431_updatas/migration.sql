/*
  Warnings:

  - The values [STANDARD,REVIEW,TIMED] on the enum `QuizAttemptMode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QuizAttemptMode_new" AS ENUM ('CLASSIC', 'TEST');
ALTER TABLE "public"."QuizAttempt" ALTER COLUMN "mode" DROP DEFAULT;
ALTER TABLE "QuizAttempt" ALTER COLUMN "mode" TYPE "QuizAttemptMode_new" USING ("mode"::text::"QuizAttemptMode_new");
ALTER TYPE "QuizAttemptMode" RENAME TO "QuizAttemptMode_old";
ALTER TYPE "QuizAttemptMode_new" RENAME TO "QuizAttemptMode";
DROP TYPE "public"."QuizAttemptMode_old";
ALTER TABLE "QuizAttempt" ALTER COLUMN "mode" SET DEFAULT 'CLASSIC';
COMMIT;

-- AlterTable
ALTER TABLE "QuizAttempt" ALTER COLUMN "mode" SET DEFAULT 'CLASSIC';
