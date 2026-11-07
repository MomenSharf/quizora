-- CreateEnum
CREATE TYPE "SessionMode" AS ENUM ('CLASSIC', 'TEST_REVIEW', 'TEST_TIMER');

-- AlterTable
ALTER TABLE "QuizAttempt" ALTER COLUMN "status" SET DEFAULT 'IDLE';
