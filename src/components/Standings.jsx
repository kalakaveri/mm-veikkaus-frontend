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
                <img key={`${team.name}-flag`} src={team.url} alt={team.name} width="35" height="20" />
                    {team.name}
                </TableCell>
                {/* <TableCell>{team.games}</TableCell>
                <TableCell>{team.wins}</TableCell>
                <TableCell>{team.draws}</TableCell>
                <TableCell>{team.losses}</TableCell>
                <TableCell>{team.goalsFor}</TableCell>
                <TableCell>{team.goalsAgainst}</TableCell>
                <TableCell>{team.goalsFor - team.goalsAgainst}</TableCell>
                <TableCell>{team.points}</TableCell> */}
            </TableRow>
            )
        })
    }
    
    return (
        <div className='standings-container'>
            <h2 align='center' className='standings-header'>Lohkovaiheen sarjataulukot</h2>
            <Grid container spacing={2}>
            {groups.map(group => (
                <Grid className='group-item' item xs={12} sm={6} md={3} key={group} container>
                <TableContainer>
                    <Table>
                        <TableHead key='table-header' className='standings-table-header-wrapper'>
                            <TableRow key={'standings-table-header-row'}>
                                <TableCell>Lohko: {group}</TableCell>
                                {/* <TableCell>Ottelut</TableCell>
                                <TableCell>Voitot</TableCell>
                                <TableCell>Tasapelit</TableCell>
                                <TableCell>Häviöt</TableCell>
                                <TableCell>Tehdyt maalit</TableCell>
                                <TableCell>Päästetyt maalit</TableCell>
                                <TableCell>Maaliero</TableCell>
                                <TableCell>Pisteet</TableCell> */}
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