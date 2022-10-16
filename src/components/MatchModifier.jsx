import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { updateMatch } from '../reducers/matchReducer';

const MatchModifier = ({ match }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const matches = useSelector(state => state.matches);
  const [homeGoals, setHomeGoals] = React.useState(0);
  const [awayGoals, setAwayGoals] = React.useState(0);

  const { matchId } = useParams();

  if (matchId || matchId !== undefined) {
    match = matches.find(m => m.id === matchId);
  }

  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedMatch = {
      ...match,
      homeGoals: homeGoals,
      awayGoals: awayGoals,
      finished: true,
    }
    dispatch(updateMatch(updatedMatch));
  }

  return (
    <div className='match-modifier-container'>
      <form className='match-modifier-form'>
        <h3 className='match-modifier-header'>Modify Match</h3>
        <div className='match-modifier-match-header'>
          <img src={match.homeTeam.url} alt={match.homeTeam.name} width="35" height="20" />
          {match.homeTeam.name}
          { ' - ' }
          {match.awayTeam.name}
          <img src={match.homeTeam.url} alt={match.homeTeam.name} width="35" height="20" />
        </div>
        <div className='match-modifier-inputs'>
          <label htmlFor='homeGoals'>{match.homeTeam.name}</label>
          <img src={match.homeTeam.url} alt={match.homeTeam.name} width="35" height="20" />
          <input type='number' name='homeGoals' value={homeGoals} onChange={e => setHomeGoals(e.target.value)} min={0} max={20} />
          { ' - ' }
          <input type='number' name='awayGoals' value={awayGoals} onChange={e => setAwayGoals(e.target.value)} min={0} max={20} />
          <img src={match.awayTeam.url} alt={match.awayTeam.name} width="35" height="20" />
        </div>
        <button className='cancel-button' type='button' onClick={() => navigate('/matches')}>Cancel</button>
        <button className='submit-button' type='submit' onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
}

export default MatchModifier;
