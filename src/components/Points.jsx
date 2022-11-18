import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from '../reducers/usersReducer';

import {
    Container, 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

const Points = () => {
    const dispatch = useDispatch()
    const guesses = useSelector(state => state.guesses)
    const matches = useSelector(state => state.matches)
    const teams = useSelector(state => state.teams)
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getAll())
      }, [])

    const sortUsers = (x) => {
        return x.sort((a, b) => b.points - a.points)
    }

    const filterMatchesForShowcase = () => {
        const filtered = []
        const now = new Date()
        for (const match of matches) {
            const dateParts = match.date.split('-')
            const timeParts = match.time.split(':')
            const dateToComp = new Date(+dateParts[2], dateParts[1]-1, +dateParts[0], +timeParts[0], +timeParts[1])
            if (dateToComp < now) {
                filtered.push(match)
            }
        }
        return filtered
    }

    const constructGuessShowcase = () => {
        const filtered = filterMatchesForShowcase()
        return (filtered.map(match => (
            <Table 
                sx={{
                    mt: 2,
                    minWidth: '600px',
                    maxWidth: '100%',
                    borderRadius: 8,
                    boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
                    background: 'linear-gradient(135deg, rgba(160,159,159,0.4), rgba(160,159,159,0.2))',
                    border: '1px solid rgba(255,255,255,0,75)',
                    backdropFilter: 'blur(5px)',
                }}
            >
                <TableHead>
                    <TableRow key={`t-header-${match.id}`}>
                        <TableCell>
                            <Typography variant='button' color='white' align='center'>
                                Kotijoukkue
                            </Typography>
                        </TableCell>
                        <TableCell colSpan={2}>
                            <Typography variant='button' color='white' align='center'>
                                Lopputulos
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant='button' color='white' align='center'>
                                Vierasjoukkue
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow key={match.id}>
                        <TableCell>
                            <img key={`${match.homeTeam.name}-flag`} src={match.homeTeam.url} alt={match.homeTeam.name} width="35" height="20" align='left' />
                            <Typography variant='button' color='white' sx={{ ml: 1 }}  align='left'>
                                {match.homeTeam.name}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant='button' color='white'  align='center'>
                                {match.homeGoals}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant='button' color='white' align='center'>
                                {match.awayGoals}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant='button' color='white' align='right'>
                                {match.awayTeam.name}
                            </Typography>
                            <img key={`${match.awayTeam.name}-flag`} src={match.awayTeam.url} alt={match.awayTeam.name} width="35" height="20" align='right' />
                        </TableCell>
                    </TableRow>
                    <TableRow key='arvaukset-header'>
                        <TableCell>
                            <Typography variant='button' color='white' align='center'>
                                Käyttäjä
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant='button' color='white' align='center'>
                                <img key={`${match.homeTeam.name}-flag`} src={match.homeTeam.url} alt={match.homeTeam.name} width="35" height="20" align='left' />
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant='button' color='white' align='center'>
                                <img key={`${match.awayTeam.name}-flag`} src={match.awayTeam.url} alt={match.awayTeam.name} width="35" height="20" align='left' />
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant='button' color='white' align='center'>
                                Pisteet
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {guesses.filter(guess => guess.match.id === match.id).map(guess => (
                        <TableRow key={guess.id}>
                            <TableCell>
                                <Typography variant='button' color='white' align='center'>
                                    {guess.user.username}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant='button' color='white' align='center'>
                                    {guess.homeTeamScore}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant='button' color='white' align='center'>
                                    {guess.awayTeamScore}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant='button' color='white' align='center'>
                                    {guess.points}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        ))
        )
    }

    return (
        <Container className='page-container'>
            {users && users.length > 0
                ? (
                    <>
                    <Table
                        sx={{
                            borderRadius: 8,
                            boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
                            background: 'linear-gradient(135deg, rgba(160,159,159,0.4), rgba(160,159,159,0.2))',
                            border: '1px solid rgba(255,255,255,0,75)',
                            backdropFilter: 'blur(5px)',
                        }}
                    >
                        <TableHead align='center'>
                            <TableRow>
                                <TableCell colSpan={3} align='center'>
                                    <Typography variant='h6' align='center' color='white'>
                                        Pistetaulukko
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align='center'><Typography variant='button' align='center' color='white'>Sija</Typography></TableCell>
                                <TableCell align='center'><Typography variant='button' align='center' color='white'>Nimi</Typography></TableCell>
                                <TableCell align='center'><Typography variant='button' align='center' color='white'>Pisteet</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortUsers(users).map((user, index) => (
                                <TableRow key={user.id}>
                                    <TableCell align='center'><Typography variant='button' align='center' color='white'>{index + 1}</Typography></TableCell>
                                    <TableCell align='center'><Typography variant='button' align='center' color='white'>{user.username}</Typography></TableCell>
                                    <TableCell align='center'><Typography variant='button' align='center' color='white'>{user.points}</Typography></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </>
                )
                : 'Ei löytynyt käyttäjiä'
            }
            <Typography variant='h6' align='center' color='white' sx={{ mt: 5 }}>
                Alla näkyvät kaikkien käyttäjien arvaukset jo pelattuihin otteluihin sekä otteluiden tulokset, kunhan ottelut on pelattu ja päivitetty.
            </Typography>
            {constructGuessShowcase()}
        </Container>
    )
}

export default Points