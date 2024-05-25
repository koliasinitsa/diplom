import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from './ItemCard';
import { Item } from '../../interfaces/ItemCardProps';
import Spinner from '../Spinner/Spinner';
import Pagination from './Pagination';

interface ItemTableProps {
    filters: {
        brand: string;
        bodyType: string;
        transmission: string;
        typeEngine: string;
    };
}

const ItemTable: React.FC<ItemTableProps> = ({ filters }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFiltered, setIsFiltered] = useState(false);

    useEffect(() => {
        if (isFiltered) {
            fetchFilteredCars(filters);
        } else {
            fetchData(currentPage);
        }
    }, [currentPage, isFiltered]);

    useEffect(() => {
        if (filters.brand || filters.bodyType || filters.transmission || filters.typeEngine) {
            setIsFiltered(true);
            fetchFilteredCars(filters);
        } else {
            setIsFiltered(false);
            fetchData(currentPage);
        }
    }, [filters]);

    const fetchData = (page: number) => {
        setLoading(true);
        axios.get(`http://localhost:3000/ItemRoutes/getAllCars`, {
            params: {
                pageNumber: page,
                pageSize: 6,
            }
        })
        .then(response => {
            setItems(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
    };

    const fetchFilteredCars = (filters: { brand: string; bodyType: string; transmission: string, typeEngine: string }) => {
        setLoading(true);
        console.log(filters)
        axios.get(`http://localhost:3000/ItemRoutes/cars`, {
            params: {
                brand: filters.brand,
                bodyType: filters.bodyType,
                transmission: filters.transmission,
                typeEngine: filters.typeEngine,
            }
        })
        .then(response => {
            setItems(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching filtered data:', error);
            setLoading(false);
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
