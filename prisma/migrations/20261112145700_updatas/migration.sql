-- CreateEnum
CREATE TYPE "QuizDifficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- DropIndex
DROP INDEX "Quiz_visibility_idx";

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "completionCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "difficulty" "QuizDifficulty" NOT NULL DEFAULT 'INTERMEDIATE',
ADD COLUMN     "estimatedDurationSeconds" INTEGER,
ADD COLUMN     "featuredAt" TIMESTAMP(3),
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastPlayedAt" TIMESTAMP(3),
ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "playCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ratingCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "trendingScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Quiz_visibility_publishedAt_idx" ON "Quiz"("visibility", "publishedAt");

-- CreateIndex
CREATE INDEX "Quiz_visibility_playCount_idx" ON "Quiz"("visibility", "playCount");

-- CreateIndex
CREATE INDEX "Quiz_visibility_trendingScore_idx" ON "Quiz"("visibility", "trendingScore");

-- CreateIndex
CREATE INDEX "Quiz_visibility_averageRating_idx" ON "Quiz"("visibility", "averageRating");

-- CreateIndex
CREATE INDEX "Quiz_visibility_isFeatured_featuredAt_idx" ON "Quiz"("visibility", "isFeatured", "featuredAt");

-- CreateIndex
CREATE INDEX "Quiz_category_visibility_publishedAt_idx" ON "Quiz"("category", "visibility", "publishedAt");

-- CreateIndex
CREATE INDEX "Quiz_language_visibility_publishedAt_idx" ON "Quiz"("language", "visibility", "publishedAt");

-- CreateIndex
CREATE INDEX "Quiz_difficulty_visibility_publishedAt_idx" ON "Quiz"("difficulty", "visibility", "publishedAt");
