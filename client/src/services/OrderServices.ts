import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getAllOrders = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/OrderRoutes/allOrders`);
        return response.data;
    } catch (error) {
        console.error('Error getall order:', error);
        throw new Error('Failed getall order');
    }
}

export const deleteOrders = async (selectedOrders: number[]) => {
    try {
        for (const order of selectedOrders) {
            await axios.delete(`${API_BASE_URL}/OrderRoutes/deleteOrders/${order}`);
        }
    } catch (error) {
        console.error('Error deleting order:', error);
        throw new Error('Failed to delete order');
    }
}