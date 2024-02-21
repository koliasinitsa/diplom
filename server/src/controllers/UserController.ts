// Управление действиями, связанными с пользователями (например, получение профиля пользователя).
// src/controllers/UserControllers.ts

import { Request, Response } from 'express';
import UserService from '../Services/UserService';

class UserController {
  async getAllUsers(req: Request, res: Response) {
    const users = await UserService.getAllUsers();
    res.json(users);
  }

  async deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    await UserService.deleteUserById(userId);
    res.send('User deleted successfully');
  }

  async blockUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    await UserService.blockUserById(userId);
    res.send('User blocked successfully');
  }

  async unblockUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    await UserService.unblockUserById(userId);
    res.send('User unblocked successfully');
  }

  async addAdmin(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    await UserService.addAdmin(userId);
    res.send('Admin added successfully');
  }

  async removeAdmin(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    await UserService.removeAdmin(userId);
    res.send('Admin removed successfully');
  }
}

export default new UserController();
