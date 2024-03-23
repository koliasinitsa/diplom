// ItemCard.tsx
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface ItemCardProps {
    item: {
        name: string;
        transmission: string;
        type: string;
        costDay: number;
    };
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
    const { name, transmission, type, costDay } = item;

    return (
        <Card style={{ width: '18rem', margin: '10px' }}>
            <div style={{ width: '100%', height: '180px', backgroundColor: '#ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span>No Image Available</span>
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
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default ItemCard;
