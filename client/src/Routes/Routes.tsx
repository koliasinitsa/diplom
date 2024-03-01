// src/Routes/Routes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from '../components/Home/HomePage';
import UsersTable from '../components/UsersTable/UsersTable';
import RegistrationForm from '../components/Auth/RegistrationForm';
import LoginForm from '../components/Auth/LoginForm';
import MyProfile from '../components/Profile/MyProfile';
import EditProfile from '../components/Profile/EditProfile';
import UserProfilePage from '../components/UsersTable/UserProfilePage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Registration" element={<RegistrationForm />} />
      <Route path="/AuthForm" element={<LoginForm />} />
      <Route path="/UsersTable" element={<UsersTable />} />
      <Route path="/userProfile/:userId" element={<UserProfilePage/>} />

      <Route path="/MyProfile" element={<MyProfile />} />
      <Route path="/EditProfile" element={<EditProfile />} />
    </Routes>
  );
};

export default AppRoutes;
