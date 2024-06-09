/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "deleted_at";
