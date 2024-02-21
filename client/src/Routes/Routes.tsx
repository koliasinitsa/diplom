// src/Routes/Routes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AuthForm from '../components/Auth/AuthForm';
import HomePage from '../components/Home/HomePage';
import UsersTable from '../components/UsersTable/UsersTable';
import UserProfilePage from '../components/Profile/UserProfilePage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/AuthForm" element={<AuthForm />} />
      <Route path="/UsersTable" element={<UsersTable />} />
      <Route path="/UserProfile" element={<UserProfilePage />} />
    </Routes>
  );
};

export default AppRoutes;
