-- CreateTable
CREATE TABLE "User" (
    "kindeID" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "age" INTEGER,
    "gender" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_kindeID_key" ON "User"("kindeID");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_slug_key" ON "User"("slug");
