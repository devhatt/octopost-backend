/*
  Warnings:

  - You are about to drop the column `social_user_id` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `favorite` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Made the column `social_media_id` on table `accounts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_social_media_id_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "social_user_id",
ADD COLUMN     "favorite" BOOLEAN NOT NULL,
ADD COLUMN     "social_media_user_id" TEXT,
ALTER COLUMN "social_media_id" SET NOT NULL,
ALTER COLUMN "avatar_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "social_media" ALTER COLUMN "description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_social_media_id_fkey" FOREIGN KEY ("social_media_id") REFERENCES "social_media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
