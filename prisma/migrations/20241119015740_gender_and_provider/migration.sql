/*
  Warnings:

  - The `gender` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `provider` on the `SocialLink` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('DISCORD', 'GOOGLE', 'FACEBOOK', 'TWITTER', 'GITHUB', 'OTHER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'NON_BINARY', 'OTHER');

-- AlterTable
ALTER TABLE "SocialLink" DROP COLUMN "provider",
ADD COLUMN     "provider" "Provider" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender";
