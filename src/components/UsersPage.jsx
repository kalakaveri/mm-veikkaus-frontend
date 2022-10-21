import React, { useEffect } from 'react'
import { getAll } from '../reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux'

import User from './User';

const UsersPage = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    if (!users || users.length === 0) {
      dispatch(getAll())
    }
  }, [dispatch, users])

  return (
    <div id='usersPage-container'>
      <h2 id='user-heading'>Users</h2>
      {users && users.length > 0 
        ? users.map(user => (
          <ul id='userslist'>
            <User key={user.id} user={user} />
          </ul>
          ))
        : <p>No users found</p>}
    </div>
  )
}

export default UsersPage