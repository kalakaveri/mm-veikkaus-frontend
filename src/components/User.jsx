import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
    <ListItem id='user-container' key={user.id}>
      {!userId ? <Link data-testid='inspect-link' to={`${user.id}/modify`} /> : null}
      <Typography className='user-heading' variant='h5'>{user.username}</Typography>
      <Typography variant='button'>role: {user.role}</Typography>
      {auth.id === user.id
        ? null
        : (
          <Box sx={{ margin: 2 }}>
            <Button
              variant='outlined'
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
        )}
    </ListItem>
  );
}

export default User