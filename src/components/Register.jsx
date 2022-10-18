import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setNotification } from "../reducers/notificationReducer"
import { register } from '../reducers/usersReducer'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Image from '../logos/login-page-bw.png'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = createTheme();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const clearInputs = () => {
    setUsername('')
    setPassword('')
    setPassword2('')
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username')
    const password = data.get('password')
    const password2 = data.get('password2')

    console.log({
      username: data.get('username'),
      password: data.get('password'),
      password2: data.get('password2'),
    });

    if (username.length < 3 && password.length < 3) {
      event.preventDefault()
      dispatch(setNotification('Käyttäjätunnus ja salasana on oltava vähintään 3 merkkiä pitkä', 'error'))
    }
    else if (password !== password2) {
      event.preventDefault()
      dispatch(setNotification('Salasanat eivät täsmää', 'error'))
    }
    else {
      dispatch(register(username, password, password2))
      clearInputs()
      navigate('/')
    }
  };

  const handleRegister = async (event) => {
    if (username.length < 3 && password.length < 3) {
      event.preventDefault()
      dispatch(setNotification('Käyttäjätunnus ja salasana on oltava vähintään 3 merkkiä pitkä', 'error'))
    }
    else if (password !== password2) {
      event.preventDefault()
      dispatch(setNotification('Salasanat eivät täsmää', 'error'))
    }
    else {
      dispatch(register(username, password, password2))
      clearInputs()
      navigate('/')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid className='login-container' container component="main">
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
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
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
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  // <form className='register-form' onSubmit={handleRegister}>
  //   <h2 className='register-header'>Rekisteröidy</h2>
  //   <div className='register-username'>
  //       <input
  //         className='register-username-input'
  //         type="text"
  //         value={username}
  //         name="Username"
  //         placeholder="Username"
  //         onChange={({ target }) => setUsername(target.value)}
  //       />
  //   </div>
  //   <div className='register-password'>
  //       <input
  //         className='register-password-input'
  //         type="password"
  //         value={password}
  //         name="Password"
  //         placeholder="Password"
  //         onChange={({ target }) => setPassword(target.value)}
  //       />
  //   </div>
  //   <div className='register-password2'>
  //       <input
  //         className='register-password-input2'
  //         type="password"
  //         value={password2}
  //         name="Password2"
  //         placeholder="Password again"
  //         onChange={({ target }) => setPassword2(target.value)}
  //       />
  //   </div>
  //   <button className='cancel-button' type='button' onClick={() => navigate('/')}>Peruuta</button>
  //   {/* <LoginButton type='register-login-button' onClick={() => navigate('/login')}>login</LoginButton> */}
  //   <button className='submit-button' type='submit'>Luo tunnus</button>
  // </form>      
)}

export default LoginForm