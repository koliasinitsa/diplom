// ItemController.ts
import { Request, Response } from 'express';
import { createItemService, deleteCarService, getAllCarsService, getCarByIdService } from '../Services/ItemServices';

export async function getAllCarsController(req: Request, res: Response) {
    try {
        const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber as string) : 1;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 6;

        const skip = (pageNumber - 1) * pageSize;

        const cars = await getAllCarsService(skip, pageSize);
        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ error: 'Error fetching cars' });
    }
}


export async function createItemController(req: Request, res: Response) {
    try {

        // Проверяем наличие загруженного файла
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        const photoPath = req.file.path;

        const newItem = await createItemService(req.body, photoPath);

        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ error: 'Error creating item' });
    }
}
// В контроллере
export const getCarById = async (req: Request, res: Response) => {
    const carId = parseInt(req.params.id);

    try {
        const car = await getCarByIdService(carId);
        if (!car) {
            return res.status(404).json({ error: 'Машина не найдена' });
        }
        res.json(car);
    } catch (error) {
        console.error('Ошибка при получении данных о машине:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};

export async function deleteCarController(req: Request, res: Response) {
    const carId = parseInt(req.params.id);

    const result = await deleteCarService(carId);

    if (result.success) {
        return res.status(200).json({ message: result.message });
    } else {
        return res.status(500).json({ message: result.message });
    }
}