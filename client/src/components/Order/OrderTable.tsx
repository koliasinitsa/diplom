// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Order {
//   id: number,
//   userEmail: string;
//   startDate: string;
//   endDate: string;
//   paymentMethod: string;
//   carBrand: string;
//   carModel: string;
// }

// const OrderTable: React.FC = () => {
//   // const [orders, setOrders] = useState<Order[]>([]);
//   const order = [
//     {
//       "id": 1,
//       "userEmail": "user@1.ru",
//       "startDate": "2024-04-04T00:00:00.000Z",
//       "endDate": "2024-04-19T00:00:00.000Z",
//       "paymentMethod": "credit_card",
//       "carBrand": "ferrari",
//       "carModel": "roma"
//     },
//     {
//       "id": 1,
//       "userEmail": "user@1.ru",
//       "startDate": "2024-04-04T00:00:00.000Z",
//       "endDate": "2024-04-19T00:00:00.000Z",
//       "paymentMethod": "credit_card",
//       "carBrand": "ferrari",
//       "carModel": "roma"
//     }
//   ]

//     // useEffect(() => {
//     //   const fetchOrders = async () => {
//     //     try {
//     //       //const response = await axios.get('http://localhost:3000/api/allOrders');
//     //       // setOrders(response.data);
//     //       console.log(orders)
//     //     } catch (error) {
//     //       console.error('Error fetching orders:', error);
//     //     }
//     //   };

//     //   fetchOrders();
//     // }, []);

//   return (
//     <div>
//       <h1>All Orders</h1>
//       {orders.map((order) => (
//         <OrderTable key={order.id} order={order} />
//       ))}
//       {/* <OrderTable key={orders.id} orders={orders} /> */}
//     </div>
//   );
// };

// export default OrderTable;
