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

  const auth = useSelector(state => state.auth);
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
            borderRadius: '10px',
            padding: '20px',
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