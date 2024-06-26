// controllers/carController.ts
import { Request, Response } from 'express';
import { getCarsService } from '../Services/CarService';

export const getCars = async (req: Request, res: Response) => {
  try {
    const { brand, bodyType, transmission, typeEngine, minPrice, maxPrice} = req.query;
    const cars = await getCarsService(
      String(brand), 
      String(bodyType), 
      String(transmission), 
      String(typeEngine),
      Number(minPrice),
      Number(maxPrice),
    );
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};