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
                            select: {
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
                            select: {
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
            fuelRate, costDay, cost3Day, costWeek, costMonth,
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
                        costMonth: parseFloat(costMonth),
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
                    costMonth: true
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
        costMonth: car.tarif.costMonth,
        transmission: car.transmission.transmission,
        brand: car.model.brand.name,
        name: car.model.name,
        year: car.model.year,
        photo: car.photo.photo
    };
};

export async function deleteCarService(carId: number) {
    try {
        const car = await prisma.car.findUnique({
            where: { id: carId },
            include: {
                photo: true,
                transmission: true,
                model: { include: { brand: true } },
                type: { include: { typeCar: true } },
            },
        });

        if (!car) {
            throw new Error('Машина не найдена');
        }

        const orders = await prisma.order.findMany({
            where: { carId: carId },
        });

        await Promise.all(orders.map(async (order) => {
            await prisma.order.delete({ where: { id: order.id } });
        }));

        await prisma.car.delete({ where: { id: carId } });

        await prisma.photo.delete({ where: { id: car.photo.id } });

        await prisma.transmission.delete({ where: { id: car.transmission.id } });

        await prisma.tarif.delete({ where: { id: car.tarifId } });

        await prisma.model.delete({ where: { id: car.modelId } });
        await prisma.brand.delete({ where: { id: car.model.brandId } });

        await prisma.type.delete({ where: { id: car.typeId } });
        await prisma.typeCar.delete({ where: { id: car.type.typeId } });

        return { success: true, message: 'Машина и все связанные элементы успешно удалены' };
    } catch (error) {
        console.error('Ошибка при удалении машины:', error);
        return { success: false, message: 'Ошибка сервера' };
    }
}