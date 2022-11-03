import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Button,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';

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
    <TableRow key={match.id}>
        <TableCell><Typography variant='button' align='center' color='white'>{match.date}</Typography></TableCell>
        <TableCell><Typography variant='button' align='center' color='white'>{match.time}</Typography></TableCell>
        <TableCell align='left'>
          <img src={match.homeTeam.url} alt={match.homeTeam.name} width="35" height="20" align='left' />
          <Typography variant='button' color='white'>
            {match.homeTeam.name}
          </Typography>
        </TableCell>
        {match.finished 
          ? (
            <>
            <TableCell><Typography variant='button' align='center' color='white'>{match.homeGoals}</Typography></TableCell>
            <TableCell><Typography variant='button' align='center' color='white'>{match.awayGoals}</Typography></TableCell>
            </>
          ) 
          : (
            <>
            <TableCell> </TableCell>
            <TableCell> </TableCell>
            </>
          )}
        <TableCell>
          <Typography variant='button' align='center' color='white' sx={{ mr: 10 }}>
            {match.awayTeam.name}
          </Typography>
          <img src={match.awayTeam.url} alt={match.awayTeam.name} width="35" height="20" margin-left='30px' align='right' />
        </TableCell>
        {auth && auth.role === 'admin' 
          ? (
            <>
            <TableCell>
              <Button variant='contained' onClick={handleModify}>
                {match.finished
                  ? 'Muokkaa'
                  : 'Lisää lopputulos'
                }  
              </Button>
            </TableCell>
            </>) 
          : null}
    </TableRow>
  );
};

export default Match