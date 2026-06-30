/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_ownerId_fkey";

-- DropIndex
DROP INDEX "Video_ownerId_idx";

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "ownerId";

-- DropTable
DROP TABLE "User";
