import { useNavigate } from "react-router-dom"
import { useState } from "react"
import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from "../reducers/notificationReducer"
import { register } from '../reducers/usersReducer'

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const clearInputs = () => {
    setUsername('')
    setPassword('')
    setPassword2('')
  }

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
  <form className='register-form' onSubmit={handleRegister}>
    <h2 className='register-header'>Rekisteröidy</h2>
    <div className='register-username'>
        <input
          className='register-username-input'
          type="text"
          value={username}
          name="Username"
          placeholder="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
    </div>
    <div className='register-password'>
        <input
          className='register-password-input'
          type="password"
          value={password}
          name="Password"
          placeholder="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
    </div>
    <div className='register-password2'>
        <input
          className='register-password-input2'
          type="password"
          value={password2}
          name="Password2"
          placeholder="Password again"
          onChange={({ target }) => setPassword2(target.value)}
        />
    </div>
    <button className='cancel-button' type='button' onClick={() => navigate('/')}>Peruuta</button>
    {/* <LoginButton type='register-login-button' onClick={() => navigate('/login')}>login</LoginButton> */}
    <button className='submit-button' type='submit'>Luo tunnus</button>
  </form>      
)}

export default LoginForm