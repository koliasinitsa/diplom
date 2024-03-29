// ItemController.ts
import { Request, Response } from 'express';
import { CarService, createItem, getAllCars } from '../Services/ItemServices';

export async function getAllCarsController(req: Request, res: Response) {
    try {
        const cars = await getAllCars();
        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ error: 'Error fetching cars' });
    }
}


export async function createItemController(req: Request, res: Response) {
    try {
        const { type, numberOfSeats, typeEngine,
            fuelRate, costDay, cost3Day, costWeek,
            transmission, name, year } = req.body;

        // Проверяем наличие загруженного файла
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        const photoPath = req.file.path;

        const newItem = await createItem(req.body, photoPath);

        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ error: 'Error creating item' });
    }
}

export const getCarById = async (req: Request, res: Response) => {
    const carId = parseInt(req.params.id);
  
    try {
      const car = await CarService.getCarById(carId);
      if (!car) {
        return res.status(404).json({ error: 'Машина не найдена' });
      }
      res.json(car);
    } catch (error) {
      console.error('Ошибка при получении данных о машине:', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  };