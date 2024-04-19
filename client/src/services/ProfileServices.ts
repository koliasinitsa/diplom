// src/services/ProfileServices.ts
import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:3000';


// Получение профиля пользователя по ID
export const getUserProfile = async (userId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/profileRoutes/profile/get/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user profile:', error);
        throw error;
    }
};

// Создание профиля пользователя с указанным ID
export const createUserProfile = async (userId: string, userData: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/profileRoutes/profile/create/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Failed to create user profile:', error);
        throw error;
    }
};

// Редактирование профиля пользователя по ID
export const updateUserProfile = async (userId: string, updatedData: any) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/profileRoutes/profile/update/${userId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Failed to update user profile:', error);
        throw error;
    }
};
