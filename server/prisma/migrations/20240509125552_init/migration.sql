-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('active', 'blocked');

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" "user_status" NOT NULL DEFAULT 'active',
    "role" "user_role" NOT NULL DEFAULT 'user',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "residence" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "paymentId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "method" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "typeId" INTEGER NOT NULL,
    "tarifId" INTEGER NOT NULL,
    "transmissionId" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,
    "photoId" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "typeId" INTEGER NOT NULL,
    "numberOfSeats" DOUBLE PRECISION NOT NULL,
    "typeEngine" TEXT NOT NULL,
    "fuelRate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeCar" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TypeCar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" DOUBLE PRECISION NOT NULL,
    "brandId" INTEGER NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarif" (
    "id" SERIAL NOT NULL,
    "costDay" DOUBLE PRECISION NOT NULL,
    "cost3Day" DOUBLE PRECISION NOT NULL,
    "costWeek" DOUBLE PRECISION NOT NULL,
    "costMonth" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Tarif_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transmission" (
    "id" SERIAL NOT NULL,
    "transmission" TEXT NOT NULL,

    CONSTRAINT "Transmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "photo" BYTEA NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_password_key" ON "Users"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_tarifId_fkey" FOREIGN KEY ("tarifId") REFERENCES "Tarif"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_transmissionId_fkey" FOREIGN KEY ("transmissionId") REFERENCES "Transmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Type" ADD CONSTRAINT "Type_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TypeCar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
