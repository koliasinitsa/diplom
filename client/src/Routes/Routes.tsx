// src/Routes/Routes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from '../components/Home/HomePage';
import UsersTable from '../components/UsersTable/UsersTable';
import RegistrationForm from '../components/Auth/RegistrationForm';
import LoginForm from '../components/Auth/LoginForm';
import MyProfile from '../components/Profile/MyProfile';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Registration" element={<RegistrationForm />} />
      <Route path="/AuthForm" element={<LoginForm />} />
      <Route path="/UsersTable" element={<UsersTable />} />
      <Route path="/MyProfile" element={<MyProfile />} />
    </Routes>
  );
};

export default AppRoutes;
