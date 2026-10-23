-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "explanationImageId" TEXT;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_explanationImageId_fkey" FOREIGN KEY ("explanationImageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
