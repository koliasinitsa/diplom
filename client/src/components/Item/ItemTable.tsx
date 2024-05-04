// ItemTable.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from './ItemCard';
import { Item } from '../../interfaces/ItemCardProps';
import Spinner from '../Spinner/Spinner';


const ItemTable: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/ItemRoutes/getAllCars')
            .then(response => {
                setItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    if (loading) {
        return <Spinner />
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '10px', maxWidth: '960px', margin: '0 auto', padding: '10px -5px' }}>
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

export default ItemTable;
