// ItemServices.ts
import { PrismaClient } from '@prisma/client';
import * as fs from "fs";

const prisma = new PrismaClient();

export async function getAllCars() {
    try {
        const cars = await prisma.car.findMany({
            include: {
                type: {
                    select: {
                        type: true,
                    },
                },
                tarif: {
                    select: {
                        costDay: true,
                    },
                },
                transmission: {
                    select: {
                        transmission: true,
                    },
                },
                model: {
                    select: {
                        name: true,
                    },
                },
                photo: {
                    select: {
                        photo: true
                    }
                }
            },
        });

        const formattedCars = cars.map(car => ({
            id: car.id,
            type: car.type.type,
            costDay: car.tarif.costDay,
            transmission: car.transmission.transmission,
            name: car.model.name,
            photo: car.photo.photo
        }));

        return formattedCars;
    } catch (error) {
        console.error('Error fetching cars:', error);
        throw new Error('Error fetching cars');
    }
}


export async function createItem(itemData: any, photoPath: string) {
    try {
        const { type, numberOfSeats, typeEngine, 
            fuelRate, costDay, cost3Day, costWeek, 
            transmission, name, year } = itemData;

        // Чтение байтов изображения из файла
        const photoData = await fs.promises.readFile(photoPath);

        const createdItem = await prisma.car.create({
            data: {
                type: {
                    create: {
                        type,
                        numberOfSeats: parseFloat(numberOfSeats),
                        typeEngine,
                        fuelRate: parseFloat(fuelRate),
                    },
                },
                tarif: {
                    create: {
                        costDay: parseFloat(costDay),
                        cost3Day: parseFloat(cost3Day),
                        costWeek: parseFloat(costWeek),
                    },
                },
                transmission: {
                    create: {
                        transmission,
                    },
                },
                model: {
                    create: {
                        name,
                        year: parseFloat(year),
                    },
                },
                photo: {
                    create: {
                        photo: photoData,
                    },
                }
            },
            include: {
                type: true,
                tarif: true,
                transmission: true,
                model: true,
                photo: true,
            },
        });

        // Удаление временного файла изображения
        await fs.promises.unlink(photoPath);

        return createdItem;
    } catch (error) {
        console.error('Error creating item:', error);
        throw new Error('Error creating item');
    }
}