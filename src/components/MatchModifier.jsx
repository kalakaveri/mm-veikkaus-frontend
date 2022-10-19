import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { updateMatch } from '../reducers/matchReducer';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography
} from '@mui/material';

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
    <Container component='main' maxWidth="xs">
      <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
						background: 'white', 
						opacity: '0.9',
						borderRadius: '10px',
						padding: '20px'
          }}
        >
        <Typography variant='h5'>Muokkaa ottelua</Typography>
        <Box 
					component="form" 
					noValidate 
					onSubmit={handleUpdate} 
					sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} xm={6}>
              <img src={match.homeTeam.url} alt={match.homeTeam.name} width="35" height="20" />
              <Typography variant='h6'>{match.homeTeam.name}</Typography>
            </Grid>
            <Grid item xs={12} xm={6}>
              <Typography variant='h6'> - </Typography>
            </Grid>
            <Grid item xs={12} xm={6}>
              <Typography variant='h6'>{match.awayTeam.name}</Typography>
              <img src={match.homeTeam.url} alt={match.homeTeam.name} width="35" height="20" />
            </Grid>
          </Grid>
        </Box>
        <div className='match-modifier-inputs'>
          <label htmlFor='homeGoals'>{match.homeTeam.name}</label>
          <img src={match.homeTeam.url} alt={match.homeTeam.name} width="35" height="20" />
          <input type='number' name='homeGoals' value={homeGoals} onChange={e => setHomeGoals(e.target.value)} min={0} max={20} />
          { ' - ' }
          <input type='number' name='awayGoals' value={awayGoals} onChange={e => setAwayGoals(e.target.value)} min={0} max={20} />
          <img src={match.awayTeam.url} alt={match.awayTeam.name} width="35" height="20" />
        </div>
        <Button variant='contained' color='error' onClick={() => navigate('/matches')}>Peruuta</Button>
        <Button variant='contained' color='success' type='submit' onClick={handleUpdate}>Päivitä</Button>
      </Box>
    </Container>
  );
}

export default MatchModifier;
