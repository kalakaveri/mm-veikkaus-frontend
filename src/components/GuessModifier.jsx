import { createTheme, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { deleteGuess, updateGuess } from '../reducers/guessReducer';

const GuessModifier = ({ guess, user }) => {
    const dispatch = useDispatch()

    const guesses = useSelector(state => state.guesses);
    const matches = useSelector(state => state.matches);
    const teams = useSelector(state => state.teams);
    const theme = createTheme();
    const [homeTeamScore, setHomeTeamScore] = useState(guess.homeTeamScore);
    const [awayTeamScore, setAwayTeamScore] = useState(guess.awayTeamScore);

    const { guessId } = useParams();
    if (guessId || guessId !== undefined) {
        guess = guesses.find(g => g.id === guessId);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteGuess(guess.id));
    }

    const handleGuessUpdate = (e) => {
        e.preventDefault()

        const updatedGuess = {
          ...guess,
          homeTeamScore: homeTeamScore,
          awayTeamScore: awayTeamScore
        }
        console.log('updatedGuess :>> ', updatedGuess);
        //dispatch(updateGuess(updatedGuess))
    }

    const filterteam = (guess, side) => {
        const match = matches.find(m => m.id === guess.match.id)
        const team = teams.find(t => t.id === match[`${side}`].id)
        if (side === 'homeTeam') {
            return (<><img src={team.url} alt={team.name} width={'35px'} height={'20px'} />{team.name}</>)
        }
        return (<>{team.name}<img src={team.url} alt={team.name} width={'35px'} height={'20px'} /></>)
    }

    return (
        <ThemeProvider theme={theme}>
            {user && user.role === 'admin' 
            ? (
                <div className='match-modifier'>
                </div>
            )
            : null
            }
            <form className='match-modifier-form' key={guess.id}>
                <label htmlFor='homeTeamScore'>{filterteam(guess, 'homeTeam')}</label>
                <input
                    id={`${guess.id}-homeTeamScore`}
                    className='homeTeamScore'
                    type='number'
                    name='homeTeamScore'
                    defaultValue={homeTeamScore}
                    onChange={e => setHomeTeamScore(e.target.value)}
                    min={0}
                    max={20}
                />
                <label htmlFor='awayTeamScore'>{filterteam(guess, 'awayTeam')}</label>
                <input
                    id={`${guess.id}-awayTeamScore`}
                    className='awayTeamScore'
                    type='number'
                    name='awayTeamScore'
                    defaultValue={awayTeamScore}
                    onChange={e => setAwayTeamScore(e.target.value)}
                    min={0}
                    max={20}
                />
                <>
                <button
                    className='cancel-button'
                    type='button'
                    onClick={e => handleDelete}
                >
                    Poista arvaus
                </button>
                <button
                    className='submit-button'
                    type='submit'
                    onSubmit={e => handleGuessUpdate}
                >
                    Päivitä arvaus
                </button>
                </>
            </form>
        </ThemeProvider>
    );
}

export default GuessModifier;
