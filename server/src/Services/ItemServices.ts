// ItemServices.ts
import { PrismaClient } from '@prisma/client';
import * as fs from "fs";

const prisma = new PrismaClient();

export async function getAllCarsService() {
    try {
        const cars = await prisma.car.findMany({
            include: {
                type: {
                    select: {
                        typeCar: {
                            select : {
                                name: true
                            }
                        }
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
                        brand: {
                            select : {
                                name: true
                            }
                        }
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
            type: car.type.typeCar.name,
            costDay: car.tarif.costDay,
            transmission: car.transmission.transmission,
            brand: car.model.brand.name,
            name: car.model.name,
            photo: car.photo.photo
        }));

        return formattedCars;
    } catch (error) {
        console.error('Error fetching cars:', error);
        throw new Error('Error fetching cars');
    }
}


export async function createItemService(itemData: any, photoPath: string) {
    try {
        const { type, numberOfSeats, typeEngine,
            fuelRate, costDay, cost3Day, costWeek,
            transmission, name, year, brand, typeCar } = itemData;

        // Чтение байтов изображения из файла
        const photoData = await fs.promises.readFile(photoPath);

        const createdItem = await prisma.car.create({
            data: {
                type: {
                    create: {
                        numberOfSeats: parseFloat(numberOfSeats),
                        typeEngine,
                        fuelRate: parseFloat(fuelRate),
                        typeCar: {
                            create: {
                                name: type
                            }
                        }
                    }
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
                        brand: {
                            create: {
                                name: brand
                            }
                        }
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

export const getCarByIdService = async (carId: number) => {
    const car = await prisma.car.findUnique({
        where: {
            id: carId,
        },
        include: {
            type: {
                select: {
                    numberOfSeats: true,
                    typeEngine: true,
                    fuelRate: true,
                    typeCar: {
                        select: {
                            name: true,
                        },
                    }
                },
            },
            tarif: {
                select: {
                    costDay: true,
                    cost3Day: true,
                    costWeek: true,
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
                    year: true,
                    brand: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
            photo: {
                select: {
                    photo: true
                }
            }
        },
    });

    if (!car) {
        return null;
    }

    return {
        typeCar: car.type.typeCar.name,
        numberOfSeats: car.type.numberOfSeats,
        typeEngine: car.type.typeEngine,
        fuelRate: car.type.fuelRate,
        costDay: car.tarif.costDay,
        cost3Day: car.tarif.cost3Day,
        costWeek: car.tarif.costWeek,
        transmission: car.transmission.transmission,
        brand: car.model.brand.name,
        name: car.model.name,
        year: car.model.year,
        photo: car.photo.photo
    };
};