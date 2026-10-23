/*
  Warnings:

  - You are about to drop the column `description` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `hint` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `imageid` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_imageid_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "description",
DROP COLUMN "hint",
DROP COLUMN "imageid",
ADD COLUMN     "imageId" TEXT;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
