import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import { updateTeam } from "../reducers/teamReducer"

import { 
  Box,
  Button,
  Container, 
  Grid, 
  TextField, 
  Typography 
} from "@mui/material"

const TeamModifier = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { teamId } = useParams()
  const team = useSelector(state => state.teams.find(t => t.id === teamId))

  const [games, setGames] = useState(team.games)
  const [wins, setWins] = useState(team.wins)
  const [draws, setDraws] = useState(team.draws)
  const [losses, setLosses] = useState(team.losses)
  const [goalsFor, setGoalsFor] = useState(team.goalsFor)
  const [goalsAgainst, setGoalsAgainst] = useState(team.goalsAgainst)
  const [points, setPoints] = useState(team.points)

  const handleModify = (e) => {
    e.preventDefault()

    let teamData = team

    if (games !== team.games) { teamData = { ...teamData, games: games } }
    if (wins !== team.wins) { teamData = { ...teamData, wins: wins }}
    if (draws !== team.draws) { teamData = { ...teamData, draws: draws }}
    if (losses !== team.losses) { teamData = { ...teamData, losses: losses }}
    if (goalsFor !== team.goalsFor) { teamData = { ...teamData, goalsFor: goalsFor }}
    if (goalsAgainst !== team.goalsAgainst) { teamData = { ...teamData, goalsAgainst: goalsAgainst }}
    if (points !== team.points) { teamData = { ...teamData, points: points } }
    teamData = { ...teamData, goaldifference: goalsFor - goalsAgainst }

    if (!(wins + draws + losses) === games) {
      alert("Games played must equal wins + draws + losses")
    }
    if (!points === ((wins * 3) + draws)) {
      alert("Points must equal (wins * 3) + draws")
    }
    else {
      dispatch(updateTeam(teamData))
      navigate(`/teams`)
    }
  }

  return (
    <Container component='main' className='page-container'>
      <Box 
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
				  borderRadius: '10px',
				  padding: '15px',
          backgroundColor: 'rgba(155,155,155,0.5)'
        }}
      >
        <Typography variant='h5' color='white' align='center'>Muokkaa joukkuetta</Typography>
        <Box component='form' noValidate onSubmit={handleModify} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item sx={12} sm={6}>
              <img src={team.url} alt={team.name} width="35" height="20" />
              <Typography sx={{ ml: 1 }} variant='button' color='white'>{team.name}</Typography>
            </Grid>
            <Grid item sx={12} sm={6}>
              <TextField 
                autoComplete='games' 
                type='number' 
                name='games' 
                value={games}
                sx={{ width: '75px'}}
                autofocus
                helperText='Ottelut'
                onChange={({target}) => setGames(target.value)} min={0} max={25} 
              />
            </Grid>
            <Grid item sx={12} sm={6}>
              <TextField
                autoComplete='wins'
                type='number'
                name='wins'
                value={wins}
                sx={{ width: '75px'}}
                helperText='Voitot'
                onChange={({target}) => setWins(target.value)} min={0} max={25}
              />
            </Grid>
            <Grid item sx={12} sm={6}>
              <TextField
                autoComplete='draws'
                type='number'
                name='draws'
                value={draws}
                sx={{ width: '75px'}}
                helperText='Tasapelit'
                onChange={({target}) => setDraws(target.value)} min={0} max={25}
              />
            </Grid>
            <Grid item sx={12} sm={6}>
              <TextField
                autoComplete='losses'
                type='number'
                name='losses'
                value={losses}
                sx={{ width: '75px'}}
                helperText='Tappiot'
                onChange={({target}) => setLosses(target.value)} min={0} max={25}
              />
            </Grid>
            <Grid item sx={12} sm={6}>
              <TextField
                autoComplete='goalsFor'
                type='number'
                name='goalsFor'
                value={goalsFor}
                sx={{ width: '100px'}}
                helperText='Tehdyt maalit'
                onChange={({target}) => setGoalsFor(target.value)} min={0} max={100}
              />
            </Grid>
            <Grid item sx={12} sm={6}>
              <TextField
                autoComplete='goalsAgainst'
                type='number'
                name='goalsAgainst'
                value={goalsAgainst}
                sx={{ width: '100px'}}
                helperText='Päästetyt maalit'
                onChange={({target}) => setGoalsAgainst(target.value)} min={0} max={100}
              />
            </Grid>
            <Grid item sx={12} sm={6}>
              <TextField
                autoComplete='points'
                type='number'
                name='points'
                value={points}
                sx={{ width: '75px'}}
                helperText='Pisteet'
                onChange={({target}) => setPoints(target.value)} min={0} max={100}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button variant='outlined' color='error' onClick={(e) => navigate('/teams')}>Cancel</Button>
            <Button variant='contained' color='success' onClick={(e) => handleModify(e)}>Modify team</Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default TeamModifier