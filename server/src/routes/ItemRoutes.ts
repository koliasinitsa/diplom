// ItemRoutes.ts
import express from 'express';
import { createItemController, deleteCarController, getAllCarsController, getCarById } from '../controllers/ItemController';
import multer from 'multer';
import { getCars } from '../controllers/CarController';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/getAllCars', getAllCarsController);

router.post('/createCars', upload.single('images'), createItemController);

router.get('/getCarById/:id', getCarById);

router.delete('/cars/:id', deleteCarController);


router.get('/cars', getCars);

export default router;
