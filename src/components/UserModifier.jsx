import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { updateUser } from '../reducers/usersReducer';
import { deleteGuess } from '../reducers/guessReducer';

import {
  Box,
  Button,
  Container,
  CssBaseline,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';

const UserModifier = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => state.users);
  const [points, setPoints] = useState(0);
  
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
      points: points
    }
    dispatch(updateUser(updatedUser));
  };
  
  if (user) {
    return (
      <Container component='main' maxWidth="xs" className='page-container'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
				  	opacity: '0.9',
				  	borderRadius: '10px',
				  	padding: '20px',
            backgroundColor: 'rgba(255,255,255,0.4)'
          }}
        >
        <Typography color='white' variant='h5'>Muokkaa käyttäjää</Typography>
        <Typography variant='button' color='white'>{user.username}</Typography>
          <Box component='form'>
            <InputLabel htmlFor='role-select'>Rooli</InputLabel>
            <Select
              name='role-select'
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value='guesser'>Arvaaja</MenuItem>
              <MenuItem value='admin'>Admin</MenuItem>
            </Select>
            <TextField
              required
              fullWidth
              sx={{ width: '160px', ml: 2, input: { color: 'white' } }}
              id='points'
              type='number'
              label='Pisteet'
              name="points"
              autoComplete="homeGoals"
              onChange={e => setPoints(parseInt(e.target.value))}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='success'
              onClick={(e) => handleUserUpdate(e)}
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
          <Box sx={{ mt: 5 }} align='center'>
            {user.guesses.length > 0
              ? <Button variant='contained' color='error' onClick={handleDeleteAll} sx={{ mt: 3 }}>Poista kaikki {user.guesses.length} arvausta</Button>
              : <p>Ei vielä veikattuja otteluita</p>
            }
          </Box>
        </Box>
      </Container>
    );
  }
};

export default UserModifier
