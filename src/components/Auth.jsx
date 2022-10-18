/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Outlet } from 'react-router-dom';
import { initUser } from '../services/auth';

const Auth = ({ authRoles }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth);

  useEffect(() => {
    if (!user.role || user === null) {
      dispatch(initUser());
    }
  }, [dispatch, user])

  useEffect(() => {
    if ((!user || user.role === 'guest') && !authRoles.includes(user.role)) {
      navigate('/login')
    }
    else if (!authRoles.includes(user.role)) {
      navigate('/')
    }
  }, [authRoles, navigate, user]);

  return (
    <div data-testid='auth-success-component'>
      {user.name}
      <Outlet />
    </div>
  )
}

export default Auth;
