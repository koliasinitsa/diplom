import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { loginUser } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../Alert/ErrorAlert';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await loginUser(email, password);
            setEmail('');
            setPassword('');
            setError('');
            navigate('/');
        } catch (error: any) {
            setError(error.error);
        }
    };

    return (
        <div>
            <Box sx={{ maxWidth: 400, mx: 'auto', mt: 20 }}>
            <form onSubmit={handleSubmit}>
                <Grid container direction="column"  spacing={2}>
                <Typography variant="h5"  style={{ marginBottom: '5px', marginLeft: '180px', marginTop: '20px' }}>Login</Typography>
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
                    {error && <ErrorAlert error={error}  />}
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
        </div>
    );
};

export default LoginForm;
