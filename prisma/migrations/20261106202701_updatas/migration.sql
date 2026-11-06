/*
  Warnings:

  - The values [TIME_OUT] on the enum `AttemptQuestionStatus` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `questionId` on table `AttemptQuestion` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttemptQuestionStatus_new" AS ENUM ('UNANSWERED', 'ANSWERED', 'TIMED_OUT');
ALTER TABLE "public"."AttemptQuestion" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "AttemptQuestion" ALTER COLUMN "status" TYPE "AttemptQuestionStatus_new" USING ("status"::text::"AttemptQuestionStatus_new");
ALTER TYPE "AttemptQuestionStatus" RENAME TO "AttemptQuestionStatus_old";
ALTER TYPE "AttemptQuestionStatus_new" RENAME TO "AttemptQuestionStatus";
DROP TYPE "public"."AttemptQuestionStatus_old";
ALTER TABLE "AttemptQuestion" ALTER COLUMN "status" SET DEFAULT 'UNANSWERED';
COMMIT;

-- AlterTable
ALTER TABLE "AttemptQuestion" ADD COLUMN     "evaluatedAt" TIMESTAMP(3),
ALTER COLUMN "questionId" SET NOT NULL;
