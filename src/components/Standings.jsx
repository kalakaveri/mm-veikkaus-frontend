import { 
    Button,
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
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { initTeams } from "../reducers/teamReducer"


const Standings = () => {
    const dispatch = useDispatch()
    const groups = ['A','B','C','D','E','F','G','H']
    const teams = useSelector(state => state.teams)
    const [showAll, setShowAll] = React.useState(false)

    useEffect(() => {
        dispatch(initTeams())
    }, [])

    const toggleShowAll = () => {
        setShowAll(!showAll)
    }
    const colspan = showAll ? 9 : 3
    
    const teamRows = (list) => {
        return list
            .sort((a, b) => (b.wins*3+b.draws) - (a.wins*3+a.draws))
            .map(team => {
                return (
                <TableRow key={team.id}>
                    <TableCell sx={{ display: 'flex', flexDirection: "row", }}>
                        <img key={`${team.name}-flag`} src={team.url} alt={team.name} width="35" height="20" align='left' />
                        <Typography variant='button' color='white' sx={{ ml: 1 }}>
                            {team.name}
                        </Typography>
                    </TableCell>
                    <TableCell align='center'>
                        <Typography variant='button' color='white'>
                            {(team.wins + team.draws + team.losses)}
                        </Typography>
                    </TableCell>
                    {showAll 
                        ? <>
                        <TableCell>
                            <Typography variant='button' color='white'>
                                {team.wins}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant='button' color='white'>
                                {team.draws}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant='button' color='white'>
                                {team.losses}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant='button' color='white'>
                                {team.goalsFor}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant='button' color='white'>
                                {team.goalsAgainst}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant='button' color='white'>{team.goalsFor - team.goalsAgainst}
                            </Typography>
                        </TableCell>
                        </>
                        : null
                    }
                    <TableCell align='center'>
                        <Typography variant='button' color='white'>
                            {(team.wins * 3 + team.draws) }
                        </Typography>    
                    </TableCell> 
                </TableRow>
                )
            }
        )
    }
    
    return (
        <Container sx={{ mb: 5 }}>
            <Typography variant='h5' color='white' align='center' sx={{ mb: 1 }}>Lohkovaiheen sarjataulukot</Typography>
            <Grid container spacing={3} justifyContent='center'>
            <Button variant='contained' onClick={toggleShowAll} sx={{ mb: 2, mt: 5, alignSelf: 'right', borderRadius: 2 }}>
                {showAll ? 'Näytä vain ottelut ja pisteet' : 'Näytä kaikki tilastot'}
            </Button>
            {groups.map(group => (
                <Grid sx={{ padding: '5px' }} item xs={12} sm={8} md={5} key={group} container>
                <TableContainer className='page-container'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell 
                                    colSpan={colspan} align='center' background-color='white'>
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
                                {showAll
                                    ? 
                                    <>
                                        <TableCell align='center'>
                                            <Typography variant='button' align='center' color='white'>
                                                Voitot
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography variant='button' align='center' color='white'>
                                                Tasapelit
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography variant='button' align='center' color='white'>
                                                Häviöt
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography variant='button' align='center' color='white'>
                                                Tehdyt maalit
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography variant='button' align='center' color='white'>
                                                Päästetyt maalit
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography variant='button' align='center' color='white'>
                                                Maaliero
                                            </Typography>
                                        </TableCell>
                                    </>
                                    : null
                                }
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