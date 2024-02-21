//Обработка запросов для регистрации и авторизации пользователей.

// src/controllers/authController.ts
import { Request, Response } from 'express';
import { registerUserService } from '../Services/AuthService';
import { authenticateUserService } from '../Services/AuthService';

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    const user = await registerUserService(username, email, password);

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Аутентификация пользователя
    const user = await authenticateUserService(email, password);

    // Возвращение успешного ответа с данными пользователя или токеном
    res.status(200).json({ user, message: 'Authentication successful' });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};