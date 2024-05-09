import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from './ItemCard';
import { Item } from '../../interfaces/ItemCardProps';
import Spinner from '../Spinner/Spinner';
import Pagination from './Pagination';

const ItemTable: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = (page: number) => {
        axios.get(`http://localhost:3000/ItemRoutes/getAllCars?pageNumber=${page}&pageSize=6`)
            .then(response => {
                setItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const goToPreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    if (loading) {
        return <Spinner />
    }

    return (
        <div>
            <Pagination 
                currentPage={currentPage}
                goToPreviousPage={goToPreviousPage}
                goToNextPage={goToNextPage}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '10px', maxWidth: '960px', margin: '0 auto', padding: '10px -5px' }}>
                    {items.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default ItemTable;
