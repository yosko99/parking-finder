/*
  Warnings:

  - Added the required column `angle` to the `ParkingSpace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParkingSpace" ADD COLUMN     "angle" INTEGER NOT NULL;
