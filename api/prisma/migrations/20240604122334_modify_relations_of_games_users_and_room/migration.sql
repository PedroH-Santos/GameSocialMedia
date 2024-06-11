/*
  Warnings:

  - You are about to drop the `_GamesToUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_roomId_fkey";

-- DropForeignKey
ALTER TABLE "_GamesToUsers" DROP CONSTRAINT "_GamesToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_GamesToUsers" DROP CONSTRAINT "_GamesToUsers_B_fkey";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "roomId" DROP NOT NULL;

-- DropTable
DROP TABLE "_GamesToUsers";

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
