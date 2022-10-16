import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const Match = ({ match }) => {
  const navigate = useNavigate()

  const auth = useSelector(state => state.auth);
  const matches = useSelector(state => state.matches);

  const { matchId } = useParams();

  if (matchId) {
    match = matches.find(m => m.id === matchId);
  }
  
  const handleModify = (e) => {
    e.preventDefault();
    if (matchId) {
      navigate('modify');
    }
    else {
      navigate(`${match.id}/modify`);
    }
  }

  return (
    <tr key={match.id}>
        <td>{match.date}</td>
        <td>{match.time}</td>
        <td>
          <img src={match.homeTeam.url} alt={match.homeTeam.name} width="35" height="20" />
          {match.homeTeam.name}
        </td>
        {match.finished 
          ? (
            <>
            <td>{match.homeGoals}</td>
            <td>{match.awayGoals}</td>
            </>
          ) 
          : (
            <>
            <td> </td>
            <td> </td>
            </>
          )}
        <td>
          {match.awayTeam.name}
          <img src={match.awayTeam.url} alt={match.awayTeam.name} width="35" height="20" />
        </td>
        {auth && auth.role === 'admin' 
          ? (
            <>
            <td>
              <button onClick={handleModify}>Lisää lopputulos</button>
            </td>
            </>) 
          : null}
    </tr>
  );
};

export default Match