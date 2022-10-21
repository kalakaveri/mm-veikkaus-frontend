import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography 
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { deleteGuess, updateGuess } from '../reducers/guessReducer';

const GuessModifier = ({ guess, user, handleDeleteAll }) => {
    const dispatch = useDispatch()
    const [homeGoals, setHomeGoals] = useState(0);
    const [awayGoals, setAwayGoals] = useState(0);

    const guesses = useSelector(state => state.guesses);
    const matches = useSelector(state => state.matches);

    const { guessId } = useParams();
    if (guessId || guessId !== undefined) {
        guess = guesses.find(g => g.id === guessId);
    }

    const handleDelete = (e) => {
        e.preventDefault()
        console.log('guess delete :>> ', guess);
        dispatch(deleteGuess(guess.id));
    }

    const handleGuessUpdate = (e) => {
        e.preventDefault()

        const updatedGuess = {
            ...guess,
            homeTeamScore: homeGoals,
            awayTeamScore: awayGoals,
        }
        console.log('updatedGuess :>> ', updatedGuess);
        //dispatch(updateGuess(updatedGuess.id, updatedGuess));
    }

    const filterTeamData = (guess) => {
        const match = matches.find(m => m.id === guess.match.id);
        return (
            <>
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
                    sx={{ width: '160px', ml: 2 }}
                    id='awayGoals'
                    type='number'
                    label={<img src={match.awayTeam.url} alt='awayteam-flag' width="35" height="20" />}
                    name="awayGoals"
                    autoComplete="awayGoals"
                    autoFocus
                    helperText={match.awayTeam.name}
                    onChange={e => setAwayGoals(e.target.value)}
                />
            </>
        )
    }

    const filterTeamGrid = (guess, side) => {
        const match = matches.find(m => m.id === guess.match.id)
        return (
            <>
            <Grid item>
                <img src={match[`${side}`].url} alt={match[`${side}`].name} width={'35px'} height={'20px'} />
                <Typography variant='h6' sx={{ ml: 1 }}>
                    {match[[`${side}`]].name}
                </Typography>
            </Grid>
            
            </>
        )
    }

    return (
        <Container component='main' maxWidth="xs" className='page-container'>
        <Box className='item-container'
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
            <Grid 
                container 
                columns={2}
                sx={{
                    '& .MuiTypography-root': {
                        textAlign: 'center'
                    },
                    '& .MuiGrid-root': {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                }}
            >
                <Grid item align='center' sx={{ ml: 4 }}>
                    {filterTeamGrid(guess, 'homeTeam')}
                </Grid>
                <Grid item align='center' sx={{ ml: 8 }}>
                    {filterTeamGrid(guess, 'awayTeam')}
                </Grid>
                <Grid item sx={{ mb: 1, ml: 1 }}>
                    <Typography variant='button' fullwidth="true" align='center' marginLeft={8}>Syötä päivitetty arvaus</Typography>
                </Grid>
                <Grid item sx={{ mb: 1, ml: 1 }}>
                    <Typography variant='button' fullwidth="true" align='center' marginLeft={12}>Arvaaja: {guess.user.username}:  {guess.homeTeamScore}  -  {guess.awayTeamScore}</Typography>
                </Grid>
            </Grid>
            <Box 
                component="form" 
                align='center'
                noValidate
            >
                {filterTeamData(guess)}
                <Button
                    variant='contained'
                    color='error'
                    type='button'
                    onClick={e => handleDelete(e)}
                >
                    Poista arvaus
                </Button>
                <Button
                    variant='contained'
                    color='success'
                    type='submit'
                    onSubmit={e => handleGuessUpdate(e)}
                >
                    Päivitä arvaus
                </Button>
            </Box>
        </Box>
        </Container>
    );
}

export default GuessModifier;
