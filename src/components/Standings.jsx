import { 
    Container,
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
            .sort((a, b) => (b.wins*3+b.draws) - (a.wins*3+a.draws))
            .map(team => {
                return (
                <TableRow key={team.id}>
                    <TableCell>
                        <img key={`${team.name}-flag`} src={team.url} alt={team.name} width="35" height="20" align='left' />
                        {team.name}
                    </TableCell>
                    <TableCell align='center'>{(team.wins + team.draws + team.losses)}</TableCell>
                    {/* <TableCell>{team.wins}</TableCell>
                    <TableCell>{team.draws}</TableCell>
                    <TableCell>{team.losses}</TableCell>
                    <TableCell>{team.goalsFor}</TableCell>
                    <TableCell>{team.goalsAgainst}</TableCell>
                    <TableCell>{team.goalsFor - team.goalsAgainst}</TableCell>*/}
                    <TableCell align='center'>{(team.wins * 3 + team.draws) }</TableCell> 
                </TableRow>
                )
            }
        )
    }
    
    return (
        <Container sx={{ mb: 5 }}>
            <Typography variant='h5' color='white' align='center' sx={{ mb: 1 }}>Lohkovaiheen sarjataulukot</Typography>
            <Grid container spacing={3} justifyContent='center'>
            {groups.map(group => (
                <Grid sx={{ padding: '5px' }} item xs={12} sm={8} md={5} key={group} container>
                <TableContainer className='page-container'>
                    <Table sx={{ mb: 0 }}>
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
        </Container>
    )
}

export default Standings