import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Car } from '../../interfaces/ItemCardProps';
import Header from '../Header/Header';
import { Button } from '@mui/material';
import MyVerticallyCenteredModal from '../Modal/Modal';
import Cookies from 'js-cookie';
import SingleImageCarousel from '../Image/ImageCarousel';
import { useTranslation } from 'react-i18next';

const ItemPage: React.FC = () => {
  const { t } = useTranslation();
  const [carInfo, setCarInfo] = useState<Car | null>(null);
  const { itemId } = useParams<string>();
  const [token, setToken] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const carDetails = { itemId, brand: carInfo?.brand, name: carInfo?.name, token };

  useEffect(() => {
    const fetchCarInfo = async () => {
      try {
        const response = await axios.get<Car>(`http://localhost:3000/ItemRoutes/getCarById/${itemId}`);
        setCarInfo(response.data);
      } catch (error) {
        console.error('Error fetching car info:', error);
      }
    };

    fetchCarInfo();

    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setIsAuthenticated(!!decodedToken.userId);
        setToken(decodedToken.userId)
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [itemId]);

  const openModal = () => {
    setModalShow(true);
  };

  const renderButton = () => {
    if (isAuthenticated) {
      return <Button variant="contained" color="success" onClick={() => openModal()}>{t('Book')}</Button>;
    } else {
      return <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>{t('Signintobook')}</p>;
    }
  };

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
              <div>
                <SingleImageCarousel
                  imageUrl={`data:image/jpeg;base64,${arrayBufferToBase64(carInfo.photo.data)}`}
                />
              </div>
              <div className="d-flex mt-3">
                <p className="mb-1 me-3" style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>Cost per Day: ${carInfo.costDay}</p>
                <p className="mb-1 me-3" style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>Cost for 3 Days: ${carInfo.cost3Day}</p>
                <p className="mb-1" style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>Cost per Week: ${carInfo.costWeek}</p>
                <p className="mb-1" style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>Cost per Month: ${carInfo.costMonth}</p>
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="mb-3" style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{carInfo.brand} {carInfo.name}</h2>
              <p><strong>Type:</strong> {carInfo.type}</p>
              <p><strong>Number of Seats:</strong> {carInfo.numberOfSeats}</p>
              <p><strong>Engine Type:</strong> {carInfo.typeEngine}</p>
              <p><strong>Fuel Rate:</strong> {carInfo.fuelRate}/100л</p>
              <p><strong>Transmission:</strong> {carInfo.transmission}</p>
              <p><strong>Year:</strong> {carInfo.year}</p>
              <div>{renderButton()}</div>
            </div>
          </div>
        ) : (
          <p style={{ fontSize: '20px', color: '#333' }}>Loading...</p>
        )}
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        carDetails={carDetails} />
    </div>
  );
};

export default ItemPage;
