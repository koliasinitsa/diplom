import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import ProfileData from '../Profile/ProfileData';


const UserProfilePage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();

    const userIdValue = userId || '';
    return (
        <div>
            <Header />
            <br />
            <br />
            <div className="container mt-5">
                <h2 className="text-center mb-4" style={{ fontSize: '24px' }}>Profile User {userId}</h2>
                <ProfileData UserId={userIdValue} />
            </div>
        </div>
    );
};

export default UserProfilePage;