import { 
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React  from 'react';
import { useSelector } from "react-redux"


const Standings = () => {
    const groups = ['A','B','C','D','E','F','G','H']
    const teams = useSelector(state => state.teams)
    
    const teamRows = (list) => {
        return list
        .sort((a, b) => b.points - a.points)
        .map(team => {
            return (
            <TableRow key={team.id}>
                <TableCell>
                    <img key={`${team.name}-flag`} src={team.url} alt={team.name} width="35" height="20" align='left' />
                    {team.name}
                </TableCell>
                <TableCell align='center'>{team.games}</TableCell>
                {/* <TableCell>{team.wins}</TableCell>
                <TableCell>{team.draws}</TableCell>
                <TableCell>{team.losses}</TableCell>
                <TableCell>{team.goalsFor}</TableCell>
                <TableCell>{team.goalsAgainst}</TableCell>
                <TableCell>{team.goalsFor - team.goalsAgainst}</TableCell>*/}
                <TableCell align='center'>{team.points}</TableCell> 
            </TableRow>
            )
        })
    }
    
    return (
        <div className='standings-container'>
            <h2 align='center' className='standings-header'>Lohkovaiheen sarjataulukot</h2>
            <Grid container spacing={3} justifyContent='center'>
            {groups.map(group => (
                <Grid className='group-item' sx={{ padding: '5px' }} item xs={12} sm={8} md={5} key={group} container>
                <TableContainer>
                    <Table>
                        <TableHead key='table-header'>
                            <TableRow>
                                <TableCell colSpan={3} align='center' background-color='white'>
                                    <Typography variant='h6' align='center' color='white'>
                                        {group}-lohko
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow key={'standings-table-header-row'}>
                                <TableCell align='center'>
                                    <Typography variant='button' align='center' color='white'>
                                        Joukkue
                                    </Typography>
                                </TableCell>
                                <TableCell align='center'>
                                    <Typography variant='button' align='center' color='white'>
                                        Ottelut
                                    </Typography>
                                </TableCell>
                                {/* <TableCell align='center'><Typography variant='button' align='center' color='white'>Voitot</Typography></TableCell>
                                <TableCell align='center'>Tasapelit</TableCell>
                                <TableCell align='center'>Häviöt</TableCell>
                                <TableCell align='center'>Tehdyt maalit</TableCell>
                                <TableCell align='center'>Päästetyt maalit</TableCell>
                                <TableCell align='center'>Maaliero</TableCell>*/}
                                <TableCell align='center'>
                                    <Typography variant='button' align='center' color='white'>
                                        Pisteet
                                    </Typography>
                                </TableCell> 
                            </TableRow>
                        </TableHead>
                        <TableBody className='standings-table-tbody'>
                            {teamRows(teams.filter(team => team.group === group))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Grid>
            ))}
            </Grid>
        </div>
    )
}

export default Standings