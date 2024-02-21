import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

interface FormData {
    email: string;
    password: string;
}

interface LoginFormProps {
    onSubmit: (formData: FormData) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // Добавьте валидацию данных по желанию
        await onSubmit(formData); // Вызываем onSubmit с объектом formData
    };

    return (
        <Box>
            <Typography component="h1" variant="h5">
            
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <Button type="submit" fullWidth variant="contained" color="primary">
                    Войти
                </Button>
            </Box>
        </Box>
    );
};

export default LoginForm;
