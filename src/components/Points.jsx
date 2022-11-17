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
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getAll())
      }, [])

    const sortUsers = (x) => {
        return x.sort((a, b) => b.points - a.points)
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
        </Container>
    )
}

export default Points