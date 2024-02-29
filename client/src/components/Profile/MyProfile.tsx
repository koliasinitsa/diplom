import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header';
import ProfileData from './ProfileData';
import { getDecodedToken } from '../../services/TokenServices';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const MyProfile: React.FC = () => {

  const decodedToken = getDecodedToken();
  const userId = decodedToken.userId

  return (
    <div>
      <Header />
      <br />
      <br />
      <div className="container mt-5">
        <h2 className="text-center mb-4" style={{ fontSize: '24px' }}>My Profile</h2>
          <ProfileData UserId={userId} />
          <Button variant="contained" href="#contained-buttons">
            <Link to="/EditProfile" style={{ textDecoration: 'none', color: 'inherit' }}>
              Edit Profile
            </Link>
          </Button>
      </div>
    </div>
  );
};

export default MyProfile;


