import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SuccessAlertProps {
  message: string;
  open: boolean;
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({ message, open }) => {
    console.log(message)
  return (
    <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
      <Alert severity="success">{message}</Alert>
    </Snackbar>
  );
};

export default SuccessAlert;
