import { useNavigate } from 'react-router-dom'
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/authReducer'

import Image from '../logos/login-page-bw.png'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Icon from '@mui/icons-material/HowToReg';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username')
    const password = data.get('password')
    dispatch(login({ username: username, password: password }))
  };
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Grid className='login-container' container component="main">
        {/* <CssBaseline /> */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <Icon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Kirjaudu sisään
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth={true}
                id="username"
                label="username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth={true}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth={true}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Kirjaudu sisään
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
)}

export default LoginForm