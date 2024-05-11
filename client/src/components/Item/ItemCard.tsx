import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ItemCardProps } from '../../interfaces/ItemCardProps';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
    const { t } = useTranslation();
    const { id, name, transmission, type, costDay, photo, brand } = item;

    // Преобразование массива чисел (буфера) в строку Base64
    const imageData = `data:image/jpeg;base64,${arrayBufferToBase64(photo.data)}`;

    // Функция для преобразования массива чисел в строку Base64
    function arrayBufferToBase64(buffer: number[]) {
        const binary = buffer.map(byte => String.fromCharCode(byte)).join('');
        return btoa(binary);
    }

    return (
        <Card style={{ width: '18rem', margin: '10px' }}>
            <div style={{ width: '100%', height: '180px', backgroundColor: '#ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {photo ? (
                    <img src={imageData} alt={`Image ${id}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                ) : (
                    <span>No Image Available</span>
                )}
            </div>
            <Card.Body>
                <Card.Title>{brand} {name}</Card.Title>
                <Card.Text style={{ marginBottom: '5px' }}>
                    <strong>{t('Transmission')}</strong> {transmission}
                </Card.Text>
                <Card.Text style={{ marginBottom: '5px' }}>
                    <strong>{t('Type')}</strong> {type}
                </Card.Text>
                <Card.Text style={{ marginBottom: '5px' }}>
                    <strong>{t('Cost per Day')}:</strong> {costDay}
                </Card.Text>
                <Link to={`/ItemPage/${id}`}>
                    <Button variant="primary">перейти</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default ItemCard;
