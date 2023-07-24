/*
  Warnings:

  - Added the required column `parkingSpaceId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "parkingSpaceId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ParkingSpace" (
    "id" TEXT NOT NULL,
    "paths" JSONB NOT NULL,
    "parkingId" TEXT NOT NULL,

    CONSTRAINT "ParkingSpace_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_parkingSpaceId_fkey" FOREIGN KEY ("parkingSpaceId") REFERENCES "ParkingSpace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingSpace" ADD CONSTRAINT "ParkingSpace_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "Parking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
