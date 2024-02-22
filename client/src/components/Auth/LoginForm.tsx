import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Здесь можно выполнить проверку email и пароля
        // Например, отправить запрос на сервер для аутентификации

        // После успешной аутентификации можно выполнить необходимые действия, например, перенаправить пользователя на другую страницу
        console.log(email, password)
        // Очищаем поля ввода и ошибку
        setEmail('');
        setPassword('');
        setError('');
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 20 }}> {/* Используем встроенные стили */}
            <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    {error && (
                        <Grid item>
                            <Typography color="error">{error}</Typography>
                        </Grid>
                    )}
                    <Grid item>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Войти
                        </Button>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }}>
                            Нет аккаунта? <Link to="/Registration">Зарегистрироваться</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default LoginForm;
