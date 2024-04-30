/*
  Warnings:

  - Added the required column `description` to the `SocialMedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SocialMedia" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "deletedAt" DROP NOT NULL;
