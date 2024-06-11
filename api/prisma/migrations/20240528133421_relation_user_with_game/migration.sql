-- CreateEnum
CREATE TYPE "UserRelationGameStatus" AS ENUM ('PLAYED', 'PLAYING', 'COMPLETED', 'ABANDONED', 'WANTPLAY', 'NONE');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Games" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamesListedByUser" (
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "status" "UserRelationGameStatus" NOT NULL DEFAULT 'NONE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GamesListedByUser_pkey" PRIMARY KEY ("userId","gameId")
);

-- CreateTable
CREATE TABLE "_GamesToUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToUsers_AB_unique" ON "_GamesToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToUsers_B_index" ON "_GamesToUsers"("B");

-- AddForeignKey
ALTER TABLE "GamesListedByUser" ADD CONSTRAINT "GamesListedByUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamesListedByUser" ADD CONSTRAINT "GamesListedByUser_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToUsers" ADD CONSTRAINT "_GamesToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToUsers" ADD CONSTRAINT "_GamesToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
