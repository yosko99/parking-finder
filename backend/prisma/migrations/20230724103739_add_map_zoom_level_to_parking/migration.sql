/*
  Warnings:

  - Added the required column `mapZoomLevel` to the `Parking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parking" ADD COLUMN     "mapZoomLevel" INTEGER NOT NULL;
