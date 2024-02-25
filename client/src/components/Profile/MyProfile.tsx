// src/components/Profile/MyProfile.tsx
import React, { useEffect, useState } from 'react';

import Header from '../Header/Header';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';


const MyProfile: React.FC = () => {
  const { t } = useTranslation();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
    country: '',
    address: ''
  });
  const [editable, setEditable] = useState(false);

  // Функция для загрузки данных с сервера (замените на вашу реализацию)
  const loadDataFromServer = () => {
    // Пример загрузки данных с сервера
    // fetch('your-api-endpoint')
    //   .then(response => response.json())
    //   .then(data => setUserData(data))
    //   .catch(error => console.error('Error loading data:', error));
    // Для примера загружаем фиктивные данные
    const fakeDataFromServer = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123-456-7890',
      dateOfBirth: '1990-01-01',
      country: 'USA',
      address: '123 Main St, New York'
    };
    setUserData(fakeDataFromServer);
  };

  // Загрузка данных с сервера при монтировании компонента
  useEffect(() => {
    loadDataFromServer();
  }, []);

  // Обработчик изменения значений полей ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Обработчик нажатия кнопки "Изменить"
  const handleEditClick = () => {
    setEditable(true);
  };

  // Обработчик нажатия кнопки "Сохранить"
  const handleSaveClick = () => {
    // Здесь можно отправить данные на сервер или выполнить другие действия
    console.log('Saved data:', userData);
    setEditable(false);
  };
  
  return (
    <div>
      <Header />
      <br />
      <br />
      <div className="container mt-5">
      <Form>
          <Form.Group controlId="formFirstName">
            <Form.Label>{t('First Name')}</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              disabled={!editable}
            />
          </Form.Group>

          <Form.Group className='mt-3' controlId="formLastName">
            <Form.Label>{t('Last Name')}</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              disabled={!editable}
            />
          </Form.Group>

          <Form.Group className='mt-3' controlId="formPhoneNumber">
            <Form.Label>{t('Phone Number')}</Form.Label>
            <Form.Control
              type="tel"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleInputChange}
              disabled={!editable}
            />
          </Form.Group>

          <Form.Group className='mt-3' controlId="formDateOfBirth">
            <Form.Label>{t('Date of Birth')}</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={userData.dateOfBirth}
              onChange={handleInputChange}
              disabled={!editable}
            />
          </Form.Group>

          <Form.Group className='mt-3' controlId="formCountry">
            <Form.Label>{t('Country')}</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={userData.country}
              onChange={handleInputChange}
              disabled={!editable}
            />
          </Form.Group>

          <Form.Group className='mt-3' controlId="formAddress">
            <Form.Label>{t('Address')}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="address"
              value={userData.address}
              onChange={handleInputChange}
              disabled={!editable}
            />
          </Form.Group>

          <div className='mt-3'>
          <Button  variant="primary" onClick={handleEditClick} disabled={editable}>
            {t('Edit')}
          </Button>
          <Button className="ms-2" variant="success" onClick={handleSaveClick} disabled={!editable}>
            {t('Save')}
          </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default MyProfile;
