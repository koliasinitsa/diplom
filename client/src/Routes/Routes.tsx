// src/Routes/Routes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from '../components/Home/HomePage';
import UsersTable from '../components/UsersTable/UsersTable';
import UserProfilePage from '../components/Profile/UserProfilePage';
import RegistrationForm from '../components/Auth/RegistrationForm';
import LoginForm from '../components/Auth/LoginForm';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Registration" element={<RegistrationForm />} />
      <Route path="/AuthForm" element={<LoginForm />} />
      <Route path="/UsersTable" element={<UsersTable />} />
      <Route path="/UserProfile" element={<UserProfilePage />} />
    </Routes>
  );
};

export default AppRoutes;
