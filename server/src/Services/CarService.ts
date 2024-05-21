// services/carService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCarsService = async (brand: string, bodyType: string, transmission: string) => {
  try {
    const cars = await prisma.car.findMany({
      where: {
        ...(brand && { model: { brand: { name: { equals: brand, mode: 'insensitive' } } } }),
        ...(bodyType && { type: { typeCar: { name: { equals: bodyType, mode: 'insensitive' } } } }),
        ...(transmission && { transmission: { transmission: { equals: transmission, mode: 'insensitive' } } })
      },
      include: {
        model: { include: { brand: true } },
        type: { include: { typeCar: true } },
        transmission: true,
        tarif: true,
        photo: true
      }
    });

    const formattedCars = cars.map(car => ({
      id: car.id,
      type: car.type.typeCar.name,
      costDay: car.tarif.costDay,
      transmission: car.transmission.transmission,
      brand: car.model.brand.name,
      name: car.model.name,
      photo: car.photo.photo
    }));

    return formattedCars;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch cars');
  }
};
