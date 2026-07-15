/*
  Warnings:

  - The values [SINGLE_CHOICE,MULTIPLE_CHOICE,SHORT_TEXT,LONG_TEXT,EMAIL,NUMBER,DATE,RATING] on the enum `QuestionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `image` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `required` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuizResponse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuizResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResponseAnswer` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Quiz` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `config` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appearance` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `settings` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PRIVATE', 'UNLISTED', 'PUBLIC');

-- CreateEnum
CREATE TYPE "ThemeMode" AS ENUM ('SYSTEM', 'LIGHT', 'DARK');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterEnum
BEGIN;
CREATE TYPE "QuestionType_new" AS ENUM ('SINGLE_SELECT', 'MULTIPLE_SELECT', 'TRUE_FALSE', 'ORDERING', 'MATCH', 'TYPE_ANSWER', 'FILL_BLANK', 'RANGE', 'LOCATION', 'GUESS', 'FLASHCARDS', 'TAP_FIND', 'DROPDOWN');
ALTER TABLE "Question" ALTER COLUMN "type" TYPE "QuestionType_new" USING ("type"::text::"QuestionType_new");
ALTER TYPE "QuestionType" RENAME TO "QuestionType_old";
ALTER TYPE "QuestionType_new" RENAME TO "QuestionType";
DROP TYPE "public"."QuestionType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "QuizResponse" DROP CONSTRAINT "QuizResponse_quizId_fkey";

-- DropForeignKey
ALTER TABLE "QuizResult" DROP CONSTRAINT "QuizResult_quizId_fkey";

-- DropForeignKey
ALTER TABLE "ResponseAnswer" DROP CONSTRAINT "ResponseAnswer_answerId_fkey";

-- DropForeignKey
ALTER TABLE "ResponseAnswer" DROP CONSTRAINT "ResponseAnswer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "ResponseAnswer" DROP CONSTRAINT "ResponseAnswer_responseId_fkey";

-- DropIndex
DROP INDEX "Question_quizId_position_idx";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "image",
DROP COLUMN "position",
DROP COLUMN "required",
ADD COLUMN     "config" JSONB NOT NULL,
ADD COLUMN     "content" JSONB NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "difficulty" "Difficulty" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "explanation" TEXT,
ADD COLUMN     "hint" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "points" DOUBLE PRECISION NOT NULL DEFAULT 1,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "coverImage",
ADD COLUMN     "appearance" JSONB NOT NULL,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "publishedVersion" INTEGER,
ADD COLUMN     "questionCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "settings" JSONB NOT NULL,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "totalPoints" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'PRIVATE';

-- DropTable
DROP TABLE "Answer";

-- DropTable
DROP TABLE "QuizResponse";

-- DropTable
DROP TABLE "QuizResult";

-- DropTable
DROP TABLE "ResponseAnswer";

-- CreateIndex
CREATE INDEX "Question_quizId_order_idx" ON "Question"("quizId", "order");

-- CreateIndex
CREATE INDEX "Question_type_idx" ON "Question"("type");

-- CreateIndex
CREATE INDEX "Question_difficulty_idx" ON "Question"("difficulty");

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_slug_key" ON "Quiz"("slug");

-- CreateIndex
CREATE INDEX "Quiz_ownerId_idx" ON "Quiz"("ownerId");

-- CreateIndex
CREATE INDEX "Quiz_status_idx" ON "Quiz"("status");

-- CreateIndex
CREATE INDEX "Quiz_visibility_idx" ON "Quiz"("visibility");

-- CreateIndex
CREATE INDEX "Quiz_updatedAt_idx" ON "Quiz"("updatedAt");

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
