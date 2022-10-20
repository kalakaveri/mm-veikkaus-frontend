import React from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setNotification } from "../reducers/notificationReducer"
import { register } from '../reducers/usersReducer'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Image from '../logos/login-page-bw.png'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = createTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username')
    const password = data.get('password')
    const password2 = data.get('password2')

    if (username.length < 3 && password.length < 3) {
      event.preventDefault()
      dispatch(setNotification('Käyttäjätunnus ja salasana on oltava vähintään 3 merkkiä pitkä', 'info'))
    }
    else if (password !== password2) {
      event.preventDefault()
      dispatch(setNotification('Salasanat eivät täsmää', 'info'))
    }
    else {
      dispatch(register(username, password, password2))
      navigate('/')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid className='page-container' container component="main">
        <CssBaseline />
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Rekisteröinti
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
              <TextField
                margin="normal"
                required
                fullWidth={true}
                name="password2"
                label="Password again"
                type="password"
                id="password2"
                autoComplete="current-password2"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Rekisteröidy
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider> 
)}

export default LoginForm