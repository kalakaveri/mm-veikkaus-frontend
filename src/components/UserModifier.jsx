import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { updateUser } from '../reducers/usersReducer';
import { deleteGuess } from '../reducers/guessReducer';

import {
  Button,
} from '@mui/material';

const UserModifier = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => state.users);
  
  const { userId } = useParams();
  const user = users.find(u => u.id === userId);
  const [role, setRole] = useState(user.role);
  

  const handleDeleteAll = (e) => {
    e.preventDefault()
    user.guesses.forEach(guess => {
      dispatch(deleteGuess(guess.id))
    })
  }

  const handleUserUpdate = (e) => {
    e.preventDefault();
    navigate('/users');
    const updatedUser = {
      id: user.id,
      username: user.username,
      role: role,
    }
    dispatch(updateUser(updatedUser));
  };
  
  if (user) {
    return (
      <div id='user-modifier-container'>
        <form id='user-modifier-role-container'>
          <h3 data-testid='user-heading'>{user.username}</h3>
          <label htmlFor='role-select'>Rooli</label>
          <select
            id='select-element'
            name='role-select'
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value='guesser'>regular</option>
            <option value='admin'>admin</option>
          </select>
          <button
            id='update-button'
            type='submit'
            onClick={(e) => handleUserUpdate(e)}
            disabled={user.role === role ? true : false}
          >
            Update
          </button>
        </form>
        <div id='user-modifier-guesses-container'>
          <h3>Veikatut ottelut</h3>
          {user.guesses.length > 0
            ? <Button variant='contained' color='error' onClick={handleDeleteAll}>Poista käyttäjän arvaukset</Button>
            : <p>Ei vielä veikattuja otteluita</p>
          }
          </div>
      </div>
    );
  }
};

export default UserModifier
