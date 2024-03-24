// ItemTable.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from './ItemCard';

interface Item {
    id: number;
    name: string;
    transmission: string;
    type: string;
    costDay: number;
}

const ItemTable: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        axios.get('https://65fdc985b2a18489b3856bb0.mockapi.io/cars')
            .then(response => {
              //  console.log(response.data)
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '960px', margin: '0 auto', padding: '10px -5px' }}>
                {items.map((item) => (
                    <div key={item.id} style={{ flex: '0 0 33.33%', maxWidth: '33.33%', padding: '5px' }}>
                        <ItemCard item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ItemTable;
