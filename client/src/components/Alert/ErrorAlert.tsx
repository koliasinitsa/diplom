import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ErrorAlertProps {
  error: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
      }, 1000); // Показываем Snackbar только на 1 секунду
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
