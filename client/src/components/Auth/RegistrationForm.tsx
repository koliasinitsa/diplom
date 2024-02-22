import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const RegistrationForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Проверка на совпадение паролей
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    // Здесь можно отправить данные на сервер или выполнить другие действия
    // например, зарегистрировать пользователя
    console.log(email, password)
    // После успешной обработки формы очищаем состояния и ошибку
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 20 }}> 
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
          <Grid item>
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Зарегистрироваться
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }}> 
              Есть аккаунт? <Link to="/AuthForm">Войдите</Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RegistrationForm;
