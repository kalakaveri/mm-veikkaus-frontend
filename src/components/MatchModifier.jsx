import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { initMatches, updateMatch } from '../reducers/matchReducer';
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { useEffect } from 'react';

const MatchModifier = ({ match }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const matches = useSelector(state => state.matches);
  const [homeGoals, setHomeGoals] = useState(0);
  const [awayGoals, setAwayGoals] = useState(0);
  const [finished, setFinished] = useState(false);

  const { matchId } = useParams();

  useEffect(() => {
    if (!matches || matches.length === 0) {
      dispatch(initMatches())
    }
  }, [dispatch, matches])

  if (matchId || matchId !== undefined) {
    match = matches.find(m => m.id === matchId);
    // setHomeGoals(match.homeGoals)
    // setAwayGoals(match.awayGoals)
    // setFinished(match.finished)
  }

  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedMatch = {
      ...match,
      homeGoals: homeGoals,
      awayGoals: awayGoals,
      finished: finished,
    }
    dispatch(updateMatch(match.id, updatedMatch));
    navigate('/matches');
  }

  return (
    <Container className='page-container' component='main' maxWidth="xs" minwidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
					borderRadius: '10px',
					padding: '20px',
          backgroundColor: 'rgba(155,155,155,0.5)'
        }}
      >
        <Typography color='white' variant='h5'>Muokkaa ottelua</Typography>
        <Grid 
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ 
            mt: 3,
            '& .MuiTypography-root': {
              textAlign: 'center'
            },
            '& .MuiGrid-root': {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }
          }}
        >
          <Grid item>
            <img src={match.homeTeam.url} alt={match.homeTeam.name} width="35" height="20" />
            <Typography color='white' variant='button' sx={{ ml: 2, mr: 2 }}>
              {match.homeTeam.name} vs {match.awayTeam.name}
            </Typography>
            <img src={match.awayTeam.url} alt={match.awayTeam.name} width="35" height="20" />
          </Grid>
        </Grid>
        <Typography color='white' variant='button' fullwidth="true" align='center' sx={{ mt: 1 }}>Syötä lopputulos</Typography>
        <Box 
          component="form" 
          align='center'
          noValidate
          onSubmit={handleUpdate}
          sx={{ mt: 3, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
        >
          <TextField
            required
            sx={{ width: '160px', input: { color: 'white' }}}
            id='homeGoals'
            type='number'
            label={<img src={match.homeTeam.url} alt='hometeam-flag' width="35" height="20" />}
            name="homeGoals"
            autoComplete="homeGoals"
            autoFocus
            helperText={match.homeTeam.name}
            onChange={e => setHomeGoals(parseInt(e.target.value))}
          />
          <TextField
            required
            sx={{ width: '160px', ml: 1, input: { color: 'white' } }}
            id='awayGoals'
            type='number'
            label={<img src={match.awayTeam.url} alt='awayteam-flag' width="35" height="20" />}
            name="homeGoals"
            autoComplete="homeGoals"
            helperText={match.awayTeam.name}
            onChange={e => setAwayGoals(parseInt(e.target.value))}
          />

        </Box>
        
        <Typography variant='button' color='white'>
          <Checkbox checked={finished} label="Ottelu pelattu" onChange={e => setFinished(e.target.checked)} />
          Ottelu pelattu
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Button variant='contained' color='error' onClick={() => navigate('/matches')}>Peruuta</Button>
          <Button variant='contained' color='success' type='submit' onClick={(e) => handleUpdate(e)}>Päivitä</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default MatchModifier;
