import React, { useState,  } from 'react';
import { Container, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import CustomAlert from '../Alert/Alert';
import { loginUser, registerUser } from '../../services/AuthService';

interface FormData {
  username?: string;
  email: string;
  password: string;
}

interface AlertData {
  open: boolean;
  severity: 'error' | 'success' | 'info';
  message: string;
}


const AuthForm: React.FC = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [alertData, setAlertData] = useState<AlertData>({
    open: false,
    severity: 'info',
    message: '',
  });
  const navigate = useNavigate();

  const handleCloseAlert = () => {
    setAlertData((prevAlertData) => ({
      ...prevAlertData,
      open: false,
    }));
  };

  const handleRegistrationSubmit = async (formData: FormData) => {
    try {
      // Вызываем функцию registerUser из вашего сервиса с данными formData
      await registerUser(formData);
      setAlertData({
        open: true,
        severity: 'success',
        message: 'Registration successful!',
      });
    } catch (error) {
      setAlertData({
        open: true,
        severity: 'error',
        message: 'Error during registration. Please check your credentials and try again.',
      });
    }
  };

  const handleLoginSubmit = async (formData: FormData) => {
    try {
      // Вызываем функцию loginUser из вашего сервиса с данными formData
      await loginUser(formData.email, formData.password);
      setAlertData({
        open: true,
        severity: 'success',
        message: 'Login successful!',
      });
      navigate('/');
    } catch (error) {
      setAlertData({
        open: true,
        severity: 'error',
        message: 'Login error. Please check your credentials and try again.',
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {isRegister ? 'Регистрация' : 'Вход'}
        </Typography>
        {isRegister ? (
          <RegistrationForm onSubmit={handleRegistrationSubmit} />
        ) : (
          <LoginForm onSubmit={handleLoginSubmit} />
        )}
        <Link
          component="button"
          variant="body2"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
        </Link>

        <CustomAlert
          open={alertData.open}
          severity={alertData.severity}
          message={alertData.message}
          onClose={handleCloseAlert}
        />
      </Box>
    </Container>
  );
};

export default AuthForm;

