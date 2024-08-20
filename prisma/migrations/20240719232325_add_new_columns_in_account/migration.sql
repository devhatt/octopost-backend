/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `avatar_url` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "avatarUrl",
ADD COLUMN     "avatar_url" TEXT NOT NULL,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "social_user_id" TEXT,
ADD COLUMN     "username" TEXT,
ALTER COLUMN "updated_at" DROP DEFAULT;
