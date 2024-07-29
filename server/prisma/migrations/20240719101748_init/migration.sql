/*
  Warnings:

  - Added the required column `contact` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPassBlockEnabled` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twoFAEnabled` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wrongPasswordCounter` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "contact" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isPassBlockEnabled" BOOLEAN NOT NULL,
ADD COLUMN     "lastFivePassword" TEXT[],
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "twoFAEnabled" BOOLEAN NOT NULL,
ADD COLUMN     "wrongPasswordCounter" INTEGER NOT NULL;
