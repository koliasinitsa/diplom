import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUserProfile } from '../../services/ProfileServices';

interface ProfileDataProps {
    UserId: string; // Изменил тип на string, чтобы соответствовать userId
}

interface ProfileData {
  name: string;
  last_name: string;
  phone: string;
  citizenship: string;
  residence: string;
}

const ProfileData: React.FC<ProfileDataProps> = ({ UserId }) => { // Принимаем userId из пропс
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string>('');
  const NoData = 'No data available'

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получение данных профиля
        const profile = await getUserProfile(UserId); // Используем переданный userId

        // Установка данных профиля в состояние компонента
        setProfileData(profile);
      } catch (error) {
        setError('Error fetching profile data');
      }
    };

    fetchData();
  }, [UserId]); // Добавляем userId в зависимости useEffect

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-6 offset-sm-3 border rounded shadow p-4">
          <p><strong>Name:</strong> {profileData?.name || NoData}</p>
          <p><strong>Last Name:</strong> {profileData?.last_name || NoData}</p>
          <p><strong>Phone:</strong> {profileData?.phone || NoData}</p>
          <p><strong>Citizenship:</strong> {profileData?.citizenship || NoData}</p>
          <p><strong>Residence:</strong> {profileData?.residence || NoData}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
