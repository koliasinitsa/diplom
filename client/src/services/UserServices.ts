// src/services/UserServices.ts
import axios, { AxiosResponse } from 'axios';
import { User } from '../interfaces/user';

const API_BASE_URL = 'http://localhost:3000'; 

// Получение всех пользователей
export const getAllUsers = async (): Promise<User[]> => {
    try {
        const response: AxiosResponse<User[]> = await axios.get(`${API_BASE_URL}/api/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw new Error('Failed to fetch all users');
    }
};

// Удаление пользователей по массиву ID
export const deleteUser = async (userIds: number[]): Promise<void> => {
    try {
        for (const userId of userIds) {
            await axios.delete(`${API_BASE_URL}/api/users/${userId}`);
        }
    } catch (error) {
        console.error('Error deleting users:', error);
        throw new Error('Failed to delete users');
    }
};

// Блокировка пользователей по массиву ID
export const blockUser = async (userIds: number[]): Promise<void> => {
    try {
        for (const userId of userIds) {
            await axios.put(`${API_BASE_URL}/api/users/block/${userId}`);
        }
    } catch (error) {
        console.error('Error blocking users:', error);
        throw new Error('Failed to block users');
    }
};

// Разблокировка пользователей по массиву ID
export const unblockUser = async (userIds: number[]): Promise<void> => {
    try {
        for (const userId of userIds) {
            await axios.put(`${API_BASE_URL}/api/users/unblock/${userId}`);
        }
    } catch (error) {
        console.error('Error unblocking users:', error);
        throw new Error('Failed to unblock users');
    }
};

// Добавление пользователя в администраторы по массиву ID
export const addAdmin = async (userIds: number[]): Promise<void> => {
    try {
        for (const userId of userIds) {
            await axios.put(`${API_BASE_URL}/api/users/add-admin/${userId}`);
        }
    } catch (error) {
        console.error('Error adding admin role to users:', error);
        throw new Error('Failed to add admin role to users');
    }
};

// Удаление пользователя из администраторов по массиву ID
export const removeAdmin = async (userIds: number[]): Promise<void> => {
    try {
        for (const userId of userIds) {
            await axios.put(`${API_BASE_URL}/api/users/remove-admin/${userId}`);
        }
    } catch (error) {
        console.error('Error removing admin role from users:', error);
        throw new Error('Failed to remove admin role from users');
    }
};