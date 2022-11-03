import React, { useEffect } from 'react'
import { getAll } from '../reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux'

import User from './User';
import { 
  Container,
  List, 
  Typography 
} from '@mui/material';

const UsersPage = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getAll())
  }, [])

  return (
    <Container component='main' maxWidth="xs" className='page-container'>
      <Typography variant='h5' color='white' align='center'>Users</Typography>
      <List key='users'>
      {users && users.length > 0 
        ? users.map(user => (
            <User key={user.id} user={user} />
            ))
            : <p>No users found</p>}
      </List>
    </Container>
  )
}

export default UsersPage