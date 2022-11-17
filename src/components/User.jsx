import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUser } from '../reducers/usersReducer';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { Box, Button, ListItem } from '@mui/material';

const User = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(state => state.users);
  const { userId } = useParams();

  if (userId || userId !== undefined) {
    user = users.find(u => u.id === userId);
  }

  const handleModify = (e, id) => {
    e.preventDefault();
    if (userId) {
      navigate('modify');
    }
    else {
      navigate(`${user.id}/modify`);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteUser(user.id));
  };

  return (
    <ListItem key={user.id}>
      <Box
        minWidth={'380px'}
        sx={{
            mt: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            borderRadius: 8,
            boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
            background: 'linear-gradient(135deg, rgba(160,159,159,0.4), rgba(160,159,159,0.2))',
            border: '1px solid rgba(255,255,255,0,75)',
            backdropFilter: 'blur(5px)',
        }}
      >
        <Typography className='user-heading' variant='h5' color='white'>{user.username}</Typography>
        <Typography variant='button' color='white'>Rooli: {user.role}</Typography>
        <Box sx={{ margin: 2 }}>
          <Button
            variant='contained'
            color='error'
            startIcon={<DeleteIcon />}
            onClick={(e) => handleDelete(e)}
          >Delete</Button>
          <Button
            variant='contained'
            onClick={(e) => handleModify(e)}
            endIcon={<EditIcon />}
          >Modify</Button>
        </Box>
      </Box>
    </ListItem>
  );
}

export default User