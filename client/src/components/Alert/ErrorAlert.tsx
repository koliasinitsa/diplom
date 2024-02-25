import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ErrorAlertProps {
  error: string;
  open: boolean;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, open }) => {
  return (
    <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
