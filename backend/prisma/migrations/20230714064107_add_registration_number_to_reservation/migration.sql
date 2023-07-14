/*
  Warnings:

  - Added the required column `registrationNumber` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "registrationNumber" TEXT NOT NULL;
