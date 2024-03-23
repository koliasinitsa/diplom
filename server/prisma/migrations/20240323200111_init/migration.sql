/*
  Warnings:

  - You are about to alter the column `numberOfSeats` on the `Type` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Type" ALTER COLUMN "numberOfSeats" SET DATA TYPE INTEGER;
