import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface ItemCardProps {
    item: {
        id: number;
        name: string;
        transmission: string;
        type: string;
        costDay: number;
        photo: {
            type: string;
            data: number[];
        };
    };
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
    const { id, name, transmission, type, costDay, photo } = item;

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
                <Card.Title>{name}</Card.Title>
                <Card.Text style={{ marginBottom: '5px' }}>
                    <strong>Transmission:</strong> {transmission}
                </Card.Text>
                <Card.Text style={{ marginBottom: '5px' }}>
                    <strong>Type:</strong> {type}
                </Card.Text>
                <Card.Text style={{ marginBottom: '5px' }}>
                    <strong>Cost per Day:</strong> {costDay}
                </Card.Text>
                <Button variant="primary">перейти</Button>
            </Card.Body>
        </Card>
    );
};

export default ItemCard;
