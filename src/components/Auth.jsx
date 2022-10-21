/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Outlet } from 'react-router-dom';
import { setNotification } from '../reducers/notificationReducer';
import { initUser } from '../services/auth';

const Auth = ({ authRoles }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth);

  useEffect(() => {
    if (!user.role || user === null) {
      dispatch(initUser());
    }
  }, [user, dispatch])

  useEffect(() => {
    if ((!user || user.role === 'guest') && !authRoles.includes(user.role)) {
      dispatch(setNotification('Kirjaudu ensin sisään', 'error', 3));
      navigate('/login')
    }

    else if (!authRoles.includes(user.role)) {
      dispatch(setNotification('Sinulla ei ole oikeuksia tälle sivulle', 'error', 3));
      navigate('/')
    }
  }, [user, authRoles, dispatch, navigate])

  return (
    <div data-testid='auth-success-component'>
      {user.name}
      <Outlet />
    </div>
  )
}

export default Auth;
