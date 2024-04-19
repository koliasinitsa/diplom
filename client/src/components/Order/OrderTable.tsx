import React, { useEffect, useState, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox, Button } from '@mui/material';
import OrderItem from './OrderItem';
import axios from 'axios';
import Header from '../Header/Header';
import { Order } from '../../interfaces/order';
import { useTranslation } from 'react-i18next';
import { deleteOrders, getAllOrders } from '../../services/OrderServices';


const OrdersTable: React.FC = () => {
    const { t } = useTranslation();
    const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await getAllOrders();
            setOrders(response);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const allOrderIds = orders.map((order) => order.id);
            setSelectedOrders(allOrderIds);
        } else {
            setSelectedOrders([]);
        }
    };

    const handleSelectOrder = useCallback(
        (orderId: number) => {
            setSelectedOrders((prevSelected) =>
                prevSelected.includes(orderId) ? prevSelected.filter((id) => id !== orderId) : [...prevSelected, orderId]
            );
        },
        []
    );

    const handleDeleteSelectedOrders = async () => {
        try {
            await deleteOrders(selectedOrders)
            // Обновляем список заказов после удаления
            fetchOrders();
            // Сбрасываем выбранные заказы
            setSelectedOrders([]);
        } catch (error) {
            console.error('Error deleting orders:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className='container' style={{ marginTop: '90px' }}>
                <Button variant="contained" color="error" onClick={handleDeleteSelectedOrders}>
                    {t('Deleted')}
                </Button>
                <Table style={{ marginTop: '30px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={selectedOrders.length > 0 && selectedOrders.length < orders.length}
                                    checked={selectedOrders.length === orders.length}
                                    onChange={(e) => handleSelectAll(e)}
                                />
                            </TableCell>
                            <TableCell>{t('Email')}</TableCell>
                            <TableCell>{t('Start Date')}</TableCell>
                            <TableCell>{t('End Date')}</TableCell>
                            <TableCell>{t('Payment Method')}</TableCell>
                            <TableCell>{t('Car Brand')}</TableCell>
                            <TableCell>{t('Car Model')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <OrderItem
                                key={order.id}
                                order={order}
                                selected={selectedOrders.includes(order.id)}
                                onSelectOrder={handleSelectOrder}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default OrdersTable;
