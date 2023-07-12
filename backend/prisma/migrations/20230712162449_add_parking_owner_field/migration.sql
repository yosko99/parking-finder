/*
  Warnings:

  - Added the required column `ownerId` to the `Parking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parking" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Parking" ADD CONSTRAINT "Parking_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
