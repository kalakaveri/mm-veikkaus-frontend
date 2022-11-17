import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { updateUser } from '../reducers/usersReducer';

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
  
  const { userId } = useParams();
  const user = users.find(u => u.id === userId);
  const [points, setPoints] = useState(user.points);
  const [role, setRole] = useState(user.role);
  const [username, setUsername] = useState(user.username);

  const handleUserUpdate = (e) => {
    e.preventDefault();
    navigate('/users');
    const updatedUser = {
      id: user.id,
      username: username,
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
				  	padding: '20px',
            backgroundColor: 'rgba(255,255,255,0.4)',
            borderRadius: 8,
            boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
            background: 'linear-gradient(135deg, rgba(160,159,159,0.4), rgba(160,159,159,0.2))',
            border: '1px solid rgba(255,255,255,0,75)',
            backdropFilter: 'blur(5px)',
          }}
        >
        <Typography color='white' variant='h5'>Muokkaa käyttäjää</Typography>
        <Typography variant='button' color='white'>{user.username}</Typography>
          <Box component='form'>
            <TextField
              required
              fullWidth
              sx={{ width: '160px', ml: 2, input: { color: 'white' } }}
              id='username'
              type='text'
              label='Käyttäjänimi'
              name="username"
              autoComplete="username"
              onChange={e => setUsername(e.target.value)}
            />
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
              autoComplete="points"
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
              ? <Typography variant='button' color='black' sx={{ mt: 2 }}>Käyttäjällä on {user.guesses.length} arvausta</Typography>
              : <Typography variant='button' color='black' sx={{ mt: 2 }}>Käyttäjällä ei ole arvauksia</Typography>
            }
          </Box>
        </Box>
      </Container>
    );
  }
};

export default UserModifier
