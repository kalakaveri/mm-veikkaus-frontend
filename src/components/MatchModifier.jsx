import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { initMatches, updateMatch } from '../reducers/matchReducer';
import {
  Box,
  Button,
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

  const { matchId } = useParams();

  useEffect(() => {
    if (!matches || matches.length === 0) {
      dispatch(initMatches())
    }
  }, [dispatch, matches])

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
    console.log('updatedMatch :', updatedMatch)
    dispatch(updateMatch(match.id, updatedMatch));
    navigate('/matches');
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
        <Grid 
          container 
          xm={6}
          sx={{ 
            mt: 3,
            '& .MuiTypography-root': {
              textAlign: 'center'
            },
            '& .MuiGrid-root': {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center'
            }
          }}
        >
          <Grid item>
            <img src={match.homeTeam.url} alt={match.homeTeam.name} width="35" height="20" />
            <Typography variant='h6' sx={{ ml: 1 }}>
              {match.homeTeam.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='h6'>   -   </Typography>
          </Grid>
          <Grid item>
            <Typography variant='h6' sx={{ mr: 1 }}>
              {match.awayTeam.name}
            </Typography>
            <img src={match.awayTeam.url} alt={match.awayTeam.name} width="35" height="20" />
          </Grid>
          <Typography variant='button' fullwidth="true" align='center' marginLeft={15}>Syötä lopputulos</Typography>
        </Grid>
        <Box 
          component="form" 
          align='center'
          noValidate
          onSubmit={handleUpdate} 
        >
          <TextField
            required
            sx={{ width: '160px'}}
            id='homeGoals'
            type='number'
            label={<img src={match.homeTeam.url} alt='hometeam-flag' width="35" height="20" />}
            name="homeGoals"
            autoComplete="homeGoals"
            autoFocus
            helperText={match.homeTeam.name}
            onChange={e => setHomeGoals(e.target.value)}
          />
          <TextField
            required
            sx={{ width: '160px', ml: 1 }}
            id='awayGoals'
            type='number'
            label={<img src={match.awayTeam.url} alt='awayteam-flag' width="35" height="20" />}
            name="homeGoals"
            autoComplete="homeGoals"
            autoFocus
            helperText={match.awayTeam.name}
            onChange={e => setAwayGoals(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Button variant='contained' color='error' onClick={() => navigate('/matches')}>Peruuta</Button>
          <Button variant='contained' color='success' type='submit' onClick={handleUpdate}>Päivitä</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default MatchModifier;
