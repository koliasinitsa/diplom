import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Car } from '../../interfaces/ItemCardProps';
import Header from '../Header/Header';
import { Button } from '@mui/material';




const ItemPage: React.FC = () => {
  const [carInfo, setCarInfo] = useState<Car | null>(null);
  const { itemId } = useParams<string>();

  useEffect(() => {
    const fetchCarInfo = async () => {
      try {
        const response = await axios.get<Car>(`http://localhost:3000/api/getCarById/${itemId}`);
        setCarInfo(response.data);
      } catch (error) {
        console.error('Error fetching car info:', error);
      }
    };

    fetchCarInfo();
  }, [itemId]);

  // Функция для преобразования массива чисел в строку Base64
  const arrayBufferToBase64 = (buffer: number[]) => {
    const binary = buffer.map(byte => String.fromCharCode(byte)).join('');
    return btoa(binary);
  };

  return (
    <div className='App'>
      <Header />
      <div className="container" style={{ marginTop: '100px' }}>
        {carInfo ? (
          <div className="row">
            <div className="col-md-6">
              <div style={{ width: '100%', height: '400px', backgroundColor: '#f0f0f0', position: 'relative', borderRadius: '10px' }}>
                <img
                  src={`data:image/jpeg;base64,${arrayBufferToBase64(carInfo.photo.data)}`}
                  alt={`Image ${carInfo.name}`}
                  className="img-fluid mb-3"
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: '10px' }}
                />
              </div>
              <div className="d-flex mt-3">
                <p className="mb-1 me-3" style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>Cost per Day: ${carInfo.costDay}</p>
                <p className="mb-1 me-3" style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>Cost for 3 Days: ${carInfo.cost3Day}</p>
                <p className="mb-1" style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>Cost per Week: ${carInfo.costWeek}</p>
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="mb-3" style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{carInfo.name}</h2>
              <p><strong>Type:</strong> {carInfo.type}</p>
              <p><strong>Number of Seats:</strong> {carInfo.numberOfSeats}</p>
              <p><strong>Engine Type:</strong> {carInfo.typeEngine}</p>
              <p><strong>Fuel Rate:</strong> {carInfo.fuelRate}/100л</p>
              <p><strong>Transmission:</strong> {carInfo.transmission}</p>
              <p><strong>Year:</strong> {carInfo.year}</p>
              <div>
                <Button variant="contained"  color="success">Забронировать</Button>
              </div>
            </div>
          </div>
        ) : (
          <p style={{ fontSize: '20px', color: '#333' }}>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ItemPage;
