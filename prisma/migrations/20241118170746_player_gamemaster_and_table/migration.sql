-- CreateEnum
CREATE TYPE "System" AS ENUM ('ORDEM_PARANORMAL', 'DND', 'OWN');

-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('FANTASY', 'SCI_FI', 'HORROR', 'MYSTERY', 'THRILLER', 'ROMANCE', 'HISTORICAL', 'WESTERN', 'DYSTOPIAN', 'CONTEMPORARY', 'PARANORMAL', 'URBAN', 'YOUNG_ADULT', 'CHILDREN', 'ADULT');

-- CreateEnum
CREATE TYPE "Weekday" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- CreateEnum
CREATE TYPE "Tag" AS ENUM ('LGBTQIA_PLUS', 'WOMEN_ONLY', 'BLACK_ONLY');

-- CreateTable
CREATE TABLE "Player" (
    "userID" TEXT NOT NULL,
    "genres" "Genre"[],

    CONSTRAINT "Player_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Experience" (
    "playerID" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "system" "System" NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("playerID")
);

-- CreateTable
CREATE TABLE "TimePeriod" (
    "playerID" TEXT NOT NULL,
    "weekday" "Weekday" NOT NULL,
    "start" INTEGER[],
    "end" INTEGER[],

    CONSTRAINT "TimePeriod_pkey" PRIMARY KEY ("playerID")
);

-- CreateTable
CREATE TABLE "GameMaster" (
    "userID" TEXT NOT NULL,
    "xp" TIMESTAMP(3) NOT NULL,
    "systems" "System"[],
    "genres" "Genre"[],

    CONSTRAINT "GameMaster_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Table" (
    "tableID" TEXT NOT NULL,
    "playersID" TEXT[],
    "gameMasterID" TEXT NOT NULL,
    "system" "System" NOT NULL,
    "genre" "Genre"[],
    "description" TEXT NOT NULL,
    "vacancies" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "paid" BOOLEAN NOT NULL,
    "price" DOUBLE PRECISION,
    "currency" TEXT,
    "tags" "Tag"[],
    "additionalInfo" TEXT,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("tableID")
);

-- CreateTable
CREATE TABLE "Frequency" (
    "tableID" TEXT NOT NULL,
    "weekday" "Weekday" NOT NULL,
    "start" INTEGER[],
    "end" INTEGER[],

    CONSTRAINT "Frequency_pkey" PRIMARY KEY ("tableID")
);

-- CreateTable
CREATE TABLE "_PlayerToTable" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Table_slug_key" ON "Table"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerToTable_AB_unique" ON "_PlayerToTable"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerToTable_B_index" ON "_PlayerToTable"("B");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_playerID_fkey" FOREIGN KEY ("playerID") REFERENCES "Player"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimePeriod" ADD CONSTRAINT "TimePeriod_playerID_fkey" FOREIGN KEY ("playerID") REFERENCES "Player"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameMaster" ADD CONSTRAINT "GameMaster_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_gameMasterID_fkey" FOREIGN KEY ("gameMasterID") REFERENCES "GameMaster"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Frequency" ADD CONSTRAINT "Frequency_tableID_fkey" FOREIGN KEY ("tableID") REFERENCES "Table"("tableID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToTable" ADD CONSTRAINT "_PlayerToTable_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToTable" ADD CONSTRAINT "_PlayerToTable_B_fkey" FOREIGN KEY ("B") REFERENCES "Table"("tableID") ON DELETE CASCADE ON UPDATE CASCADE;
