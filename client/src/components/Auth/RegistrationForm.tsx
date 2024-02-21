import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

interface FormData {
    username: string;
    email: string;
    password: string;
}

interface RegistrationFormProps {
    onSubmit: (formData: FormData) => Promise<void>;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
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
        setFormData({ // Очищаем форму после успешной отправки
            username: '',
            email: '',
            password: '',
        });
    };


    return (
        <Box>
            <Typography component="h1" variant="h5">
                
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Имя пользователя"
                    name="username"
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleChange}
                />
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
                    Зарегистрироваться
                </Button>
            </Box>
        </Box>
    );
};

export default RegistrationForm;
