//Маршруты для управления профилями пользователей.
//src/routes/UserRoutes.ts

import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.get('/users', UserController.getAllUsers);
router.delete('/users/:id', UserController.deleteUser);
router.put('/users/block/:id', UserController.blockUser);
router.put('/users/unblock/:id', UserController.unblockUser);
router.put('/users/add-admin/:id', UserController.addAdmin);
router.put('/users/remove-admin/:id', UserController.removeAdmin);

export default router;
