import React, { useEffect, useState, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox } from '@mui/material';
import OrderItem from './OrderItem';
import axios from 'axios';
import Header from '../Header/Header';
import { Order } from '../../interfaces/order';
import { useTranslation } from 'react-i18next';


const OrdersTable: React.FC = () => {
    const { t } = useTranslation();
    const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/allOrders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

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
        [setSelectedOrders]
    );

    return (
        <div>
            <Header />
            <div className='container'>
                <Table style={{ marginTop: '100px' }}>
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
