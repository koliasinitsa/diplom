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
import ItemPage from '../components/Item/ItemPage';
import CreateItemForm from '../components/Item/CreateItemForm';
import OrderTable from '../components/Order/OrderTable';
import { Spravka } from '../assets/spravka/spravka';
import { EditItemForm } from '../components/Item/EditItemForm';

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
      
      <Route path="/ItemPage/:itemId" element={<ItemPage />} />
      <Route path="/CreateItemForm" element={<CreateItemForm />} />
      <Route path="/EditItemForm" element={<EditItemForm />} />

      <Route path="/OrderTable" element={<OrderTable />} />

      <Route path="/Spravka" element={<Spravka />} />
    </Routes>
  );
};

export default AppRoutes;
