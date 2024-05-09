import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SuccessAlertProps {
  message: string;
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({ message }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
        setOpen(true);
        const timer = setTimeout(() => {
            setOpen(false);
        }, 1000); 
        return () => clearTimeout(timer);
    } else {
        setOpen(false);
    }
}, [message]);

  return (
    <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
      <Alert severity="success">{message}</Alert>
    </Snackbar>
  );
};

export default SuccessAlert;
