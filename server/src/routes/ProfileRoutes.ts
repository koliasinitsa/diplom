
import express from 'express';
import * as ProfileController from '../controllers/ProfileController';

const router = express.Router();



// PUT /profile
router.put('/profile/update/:id', ProfileController.updateProfile);

// GET /profile
router.get('/profile/get/:id', ProfileController.getProfile);

export default router;
