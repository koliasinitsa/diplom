import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Header from '../Header/Header';
import { useTranslation } from 'react-i18next';
import { getUserProfile, updateUserProfile } from '../../services/ProfileServices';
import { getDecodedToken } from '../../services/TokenServices';

const MyProfile: React.FC = () => {
  const { t } = useTranslation();

  const [userData, setUserData] = useState({
    name: '',
    last_name: '',
    phone: '',
    citizenship: '',
    residence: ''
  });
  const [editable, setEditable] = useState(false);
  const [userId, setUserId] = useState('');

  const loadDataFromServer = async () => {
    try {
      const response = await getDecodedToken(); // Получение id пользователя из токена
      const userId = response.userId;
      setUserId(userId);
      const userProfile = await getUserProfile(userId); // Получение профиля пользователя
      setUserData(userProfile);
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  useEffect(() => {
    loadDataFromServer();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleSaveClick = async () => {
    try {
      await updateUserProfile(userId, userData); // Обновление профиля пользователя
      setEditable(false);
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
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
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              disabled={!editable}
            />
          </Form.Group>

          <Form.Group className='mt-3' controlId="formLastName">
            <Form.Label>{t('Last Name')}</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={userData.last_name}
              onChange={handleInputChange}
              disabled={!editable}
            />
          </Form.Group>

          <Form.Group className='mt-3' controlId="formPhoneNumber">
            <Form.Label>{t('Phone Number')}</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              disabled={!editable}
            />
          </Form.Group>


          <Form.Group className='mt-3' controlId="formCountry">
            <Form.Label>{t('Country')}</Form.Label>
            <Form.Control
              type="text"
              name="citizenship"
              value={userData.citizenship}
              onChange={handleInputChange}
              disabled={!editable}
            />
          </Form.Group>

          <Form.Group className='mt-3' controlId="formAddress">
            <Form.Label>{t('Address')}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="residence"
              value={userData.residence}
              onChange={handleInputChange}
              disabled={!editable}
            />
          </Form.Group>

          <div className='mt-3'>
            <Button variant="primary" onClick={handleEditClick} disabled={editable}>
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
