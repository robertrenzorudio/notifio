/*
  Warnings:

  - Added the required column `authProvider` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailVerfied` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('APPLE', 'FACEBOOK', 'GOOGLE', 'LOCAL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authProvider" "AuthProvider" NOT NULL,
ADD COLUMN     "emailVerfied" BOOLEAN NOT NULL;
