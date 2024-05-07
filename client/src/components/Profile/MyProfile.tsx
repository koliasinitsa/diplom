import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header';
import ProfileData from './ProfileData';
import { getDecodedToken } from '../../services/TokenServices';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

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
        <div style={{display: 'grid', }}>
          <ProfileData UserId={userId} />
          <Button variant="contained" href="#contained-buttons" style={{width: "170px", marginTop: "30px", marginLeft: "800px"}} >
            <Link to="/EditProfile" style={{ textDecoration: 'none', color: 'inherit' }}>
              Edit Profile
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;


