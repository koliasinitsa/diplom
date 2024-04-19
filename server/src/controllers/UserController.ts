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
    try {
      const userId = parseInt(req.params.id, 10);
      await UserService.deleteUserById(userId);
      res.send('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Failed to delete user');
    }
  }

  async blockUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      await UserService.blockUserById(userId);
      res.send('User blocked successfully');
    } catch (error) {
      console.error('Error blocking user:', error);
      res.status(500).send('Failed to block user');
    }
  }

  async unblockUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      await UserService.unblockUserById(userId);
      res.send('User unblocked successfully');
    } catch (error) {
      console.error('Error unblocking user:', error);
      res.status(500).send('Failed to unblock user');
    }
  }

  async addAdmin(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      await UserService.addAdmin(userId);
      res.send('Admin added successfully');
    } catch (error) {
      console.error('Error adding admin:', error);
      res.status(500).send('Failed to add admin');
    }
  }

  async removeAdmin(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      await UserService.removeAdmin(userId);
      res.send('Admin removed successfully');
    } catch (error) {
      console.error('Error removing admin:', error);
      res.status(500).send('Failed to remove admin');
    }
  }
}

export default new UserController();
