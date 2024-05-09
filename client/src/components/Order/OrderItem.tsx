import React from 'react';
import { TableRow, TableCell, Checkbox } from '@mui/material';
import { Order } from '../../interfaces/order';



interface Props {
  order: Order;
  selected: boolean;
  onSelectOrder: (orderId: number) => void;
}

const OrderItem: React.FC<Props> = ({ order, selected, onSelectOrder }) => {
  const handleSelect = () => {
    onSelectOrder(order.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <TableRow style={{ backgroundColor: selected ? '#93e0ff' : 'transparent' }}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={handleSelect} />
      </TableCell>
      <TableCell>{order.userEmail}</TableCell>
      <TableCell>{formatDate(order.startDate)}</TableCell>
      <TableCell>{formatDate(order.endDate)}</TableCell>
      <TableCell>{order.daysCount} days</TableCell>
      <TableCell>{order.paymentMethod}</TableCell>
      <TableCell>{order.rentalCost}$</TableCell>
      <TableCell>{order.carBrand}</TableCell>
      <TableCell>{order.carModel}</TableCell>
    </TableRow>
  );
};

export default OrderItem;
