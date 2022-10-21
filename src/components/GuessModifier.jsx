import {
    Box,
    Button,
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
                    sx={{ width: '160px', ml: 1 }}
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
            <Grid item>
                <img src={match[`${side}`].url} alt={match[`${side}`].name} width={'35px'} height={'20px'} />
                <Typography variant='h6' sx={{ ml: 1 }}>
                    {match[[`${side}`]].name}
                </Typography>
            </Grid>
        )
    }

    return (
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
            <Grid 
                container 
                xm={6}
                sx={{
                    border: '1px solid black',
                    mt: 3,
                    '& .MuiTypography-root': {
                        textAlign: 'center'
                    },
                    '& .MuiGrid-root': {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }
                }}
            >
                {filterTeamGrid(guess, 'homeTeam')}
                {filterTeamGrid(guess, 'awayTeam')}
                <Typography variant='button' fullwidth="true" align='center' marginLeft={15}>Syötä päivitetty arvaus</Typography>
            </Grid>
            <Box 
                component="form" 
                align='center'
                noValidate
                onSubmit={updateGuess} 
            >
                {filterTeamData(guess)}
                <Button
                    variant='contained'
                    color='error'
                    onClick={e => handleDelete}
                >
                    Poista arvaus
                </Button>
                <Button
                    variant='contained'
                    color='success'
                    type='submit'
                    onSubmit={e => handleGuessUpdate}
                >
                    Päivitä arvaus
                </Button>
            </Box>
        </Box>
    );
}

export default GuessModifier;
