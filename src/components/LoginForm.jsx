import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/authReducer'
import { Container } from '@mui/material'

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login({ username: username, password: password }))
    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
  <Container className='login-container'>
    <form className='login-form' onSubmit={handleLogin}>

      <div id='login-form-content'>
        <h3 className='login-header'>Login</h3>
        <div className='login-input-container'>
          <input
            type='text'
            className='login-username-input'
            placeholder='Username'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className='login-input-container'>
          <input
            type='password'
            className='login-password-input'
            placeholder='Password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className='cancel-button' type='button' onClick={() => navigate('/')}>Peruuta</button>
        <button className='submit-button' type='submit'>Kirjaudu</button>
      </div>
    </form>
  </Container>   
)}

export default LoginForm