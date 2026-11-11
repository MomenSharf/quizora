/*
  Warnings:

  - The values [TEST_REVIEW,TEST_TIMER] on the enum `SessionMode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SessionMode_new" AS ENUM ('CLASSIC', 'TEST');
ALTER TYPE "SessionMode" RENAME TO "SessionMode_old";
ALTER TYPE "SessionMode_new" RENAME TO "SessionMode";
DROP TYPE "public"."SessionMode_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;
