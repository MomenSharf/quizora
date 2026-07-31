/*
  Warnings:

  - The values [LOCATION] on the enum `QuestionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `imageUrl` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QuestionType_new" AS ENUM ('SINGLE_SELECT', 'MULTIPLE_SELECT', 'TRUE_FALSE', 'ORDERING', 'MATCH', 'TYPE_ANSWER', 'FILL_BLANK', 'RANGE', 'GUESS', 'FLASHCARDS', 'TAP_FIND', 'DROPDOWN');
ALTER TABLE "Question" ALTER COLUMN "type" TYPE "QuestionType_new" USING ("type"::text::"QuestionType_new");
ALTER TYPE "QuestionType" RENAME TO "QuestionType_old";
ALTER TYPE "QuestionType_new" RENAME TO "QuestionType";
DROP TYPE "public"."QuestionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "imageUrl",
ADD COLUMN     "imageid" TEXT;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "thumbnail",
ADD COLUMN     "imageId" TEXT;

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "alt" TEXT NOT NULL,
    "ratio" TEXT NOT NULL DEFAULT 'AUTO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_imageid_fkey" FOREIGN KEY ("imageid") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
