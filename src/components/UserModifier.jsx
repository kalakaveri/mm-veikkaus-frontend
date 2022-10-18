import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { updateUser } from '../reducers/usersReducer';
import GuessModifier from './GuessModifier';

const UserModifier = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => state.users);
  const guesses = useSelector(state => state.guesses);
  const matches = useSelector(state => state.matches);
  const teams = useSelector(state => state.teams);
  
  const { userId } = useParams();
  const user = users.find(u => u.id === userId);
  
  const [role, setRole] = useState(user.role);
  const [visible, setVisible] = useState(false)

  const toggleVisibility = (e) => {
    e.preventDefault()
    setVisible(!visible)
  }

  const handleUserUpdate = (e) => {
    e.preventDefault();
    navigate('/users');
    dispatch(updateUser({ ...user, role: role }));
  };

  const filterteam = (id, side) => {
    const match = matches.find(m => m.id === id)
    const team = teams.find(t => t.id === match[`${side}`].id)
    if (side === 'homeTeam') {
      return (<><img src={team.url} alt={team.name} width={'35px'} height={'20px'} />{team.name}</>)
    }
    return (<>{team.name}<img src={team.url} alt={team.name} width={'35px'} height={'20px'} /></>)
  }
  
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
            ? user.guesses.map(guess => (
              <div key={guess.id} className='user-modifier-guess-modify'>
                <Link key={guess.id} to={`/guesses/${guess.id}`}>
                  <GuessModifier guess={guess}/>
                </Link>
              </div>
            ))
            : <p>Ei vielä veikattuja otteluita</p>
          }
          </div>
      </div>
    );
  }
};

export default UserModifier
