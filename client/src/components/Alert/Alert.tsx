// Alert.tsx
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { FC } from 'react';

interface AlertProps {
  open: boolean;
  severity: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
}

const CustomAlert: FC<AlertProps> = ({ open, severity, message, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert severity={severity } onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
