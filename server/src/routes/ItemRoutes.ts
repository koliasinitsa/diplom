// ItemRoutes.ts
import express from 'express';
import { createItemController, getAllCarsController } from '../controllers/ItemController';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/getAllCars', getAllCarsController);

router.post('/createCars', upload.single('images'), createItemController);

export default router;
