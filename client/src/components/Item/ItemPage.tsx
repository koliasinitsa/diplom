import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Car } from '../../interfaces/ItemCardProps';
import Header from '../Header/Header';
import { Button } from '@mui/material';
import ButtonBS from 'react-bootstrap/Button';

import MyVerticallyCenteredModal from '../Modal/Modal';
import Cookies from 'js-cookie';
import SingleImageCarousel from '../Image/ImageCarousel';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import Spinner from '../Spinner/Spinner';

const ItemPage: React.FC = () => {
  const { t } = useTranslation();
  const [carInfo, setCarInfo] = useState<Car | null>(null);
  const { itemId } = useParams<string>();
  const [token, setToken] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const carDetails = { itemId, brand: carInfo?.brand, name: carInfo?.name, token };
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Состояние для отслеживания видимости модального окна удаления
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarInfo = async () => {
      try {
        const response = await axios.get<Car>(`http://localhost:3000/ItemRoutes/getCarById/${itemId}`);
        setCarInfo(response.data);
        setLoading(false);
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
        setRole(decodedToken.role);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [itemId]);

  const openModal = () => {
    setModalShow(true);
  };
  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setModalShow(false);
    setShowDeleteModal(false);
  };

  const renderButton = () => {
    if (isAuthenticated) {
      return <Button variant="contained" color="success" onClick={() => openModal()}>{t('Book')}</Button>;
    } else {
      return <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333',width: '100px' }}>{t('Signintobook')}</p>;
    }
  };

  const arrayBufferToBase64 = (buffer: number[]) => {
    const binary = buffer.map(byte => String.fromCharCode(byte)).join('');
    return btoa(binary);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/ItemRoutes/cars/${itemId}`);
      console.log(itemId)
      navigate('/');
      closeModal(); // Закрываем модальное окно после успешного удаления
      // Дополнительные действия после удаления, например, перенаправление на другую страницу
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  if (loading) {
    return <Spinner />
  }

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
              <p><strong>Type:</strong> {carInfo.typeCar}</p>
              <p><strong>Number of Seats:</strong> {carInfo.numberOfSeats}</p>
              <p><strong>Engine Type:</strong> {carInfo.typeEngine}</p>
              <p><strong>Fuel Rate:</strong> {carInfo.fuelRate}/100л</p>
              <p><strong>Transmission:</strong> {carInfo.transmission}</p>
              <p><strong>Year:</strong> {carInfo.year}</p>
              <div>
                {renderButton()}
                {role === 'admin' && (
                  <Button style={{ marginLeft: '10px', width: '100px' }} variant="contained" color="error" onClick={() => openDeleteModal()}>
                    {t('Deleted')}
                  </Button>
                )}
                {/* {role === 'admin' && (
                  <Link to="/EditItemForm" style={{ textDecoration: 'none', color: 'inherit', marginLeft: '10px' }}>
                    <Button variant="contained" color="secondary"
                      style={{ width: '100px', height: '40px' }}>
                      {t('EditItemForm')}
                    </Button>
                  </Link>
                )} */}
              </div>
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

      <Modal show={showDeleteModal} onHide={() => closeModal()} style={{ marginTop: '100px' }} backdrop="static">

        <Modal.Body>
          <p style={{ fontSize: '20px', color: '#333' }} >{t('Are you sure you want to delete')} <strong> {carInfo?.brand} {carInfo?.name}? </strong>  </p>
        </Modal.Body>
        <Modal.Footer>
          <ButtonBS variant="secondary" onClick={() => closeModal()}>
            {t('Cancel')}
          </ButtonBS>
          <ButtonBS variant="warning" onClick={handleDelete}>
            {t('Deleted')}
          </ButtonBS>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ItemPage;
