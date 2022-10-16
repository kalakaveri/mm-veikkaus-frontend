import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteUser } from '../reducers/usersReducer';

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
    <li id='user-container' key={user.id}>
      {!userId ? <Link data-testid='inspect-link' to={`${user.id}/modify`} /> : null}
      <h3 id='user-heading'>{user.username}</h3>
      <div id='user-role'>role: {user.role}</div>
      {auth.id === user.id
        ? null
        : (
          <>
            <button
              id={`user-modify-button`}
              onClick={(e) => handleModify(e)}
            >Modify</button>
            <button
              id={`user-delete-button`}
              onClick={(e) => handleDelete(e)}
            >Delete</button>
          </>
        )}
    </li>
  );
}

export default User