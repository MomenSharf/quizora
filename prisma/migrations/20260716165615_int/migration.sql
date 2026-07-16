/*
  Warnings:

  - The values [UNSELECTED] on the enum `QuestionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QuestionType_new" AS ENUM ('SINGLE_SELECT', 'MULTIPLE_SELECT', 'TRUE_FALSE', 'ORDERING', 'MATCH', 'TYPE_ANSWER', 'FILL_BLANK', 'RANGE', 'LOCATION', 'GUESS', 'FLASHCARDS', 'TAP_FIND', 'DROPDOWN');
ALTER TABLE "Question" ALTER COLUMN "type" TYPE "QuestionType_new" USING ("type"::text::"QuestionType_new");
ALTER TYPE "QuestionType" RENAME TO "QuestionType_old";
ALTER TYPE "QuestionType_new" RENAME TO "QuestionType";
DROP TYPE "public"."QuestionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "tags" SET DEFAULT ARRAY['general']::TEXT[];
