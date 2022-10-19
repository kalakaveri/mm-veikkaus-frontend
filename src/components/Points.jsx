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
        if (!users || users.length === 0) {
            dispatch(getAll())
        }
      }, [dispatch])

    const sortUsers = (x) => {
        return x.sort((a, b) => b.points - a.points)
    }

    return (
        <Container className='points-container' sx={{ mt: 10 }}>
            {users && users.length > 0
                ? (
                    <>
                    <Table className='points-table'>
                        <TableHead align='center'>
                            <TableRow>
                                <TableCell colSpan={3} align='center'>
                                    <Typography variant='h6' align='center' color='white'>
                                        Pistetaulukko
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align='center'>Sija</TableCell>
                                <TableCell align='center'>Nimi</TableCell>
                                <TableCell align='center'>Pisteet</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortUsers(users).map((user, index) => (
                                <TableRow key={user.id}>
                                    <TableCell align='center'>{index + 1}</TableCell>
                                    <TableCell align='center'>{user.username}</TableCell>
                                    <TableCell align='center'>{user.points}</TableCell>
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