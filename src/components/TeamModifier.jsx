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

  const [wins, setWins] = useState(team.wins)
  const [draws, setDraws] = useState(team.draws)
  const [losses, setLosses] = useState(team.losses)
  const [goalsFor, setGoalsFor] = useState(team.goalsFor)
  const [goalsAgainst, setGoalsAgainst] = useState(team.goalsAgainst)
  const [points, setPoints] = useState(team.points)

  const handleModify = (e) => {
    e.preventDefault()

    let teamData = team

    if (wins !== team.wins) { teamData = { ...teamData, wins: parseInt(wins) }}
    if (draws !== team.draws) { teamData = { ...teamData, draws: parseInt(draws) }}
    if (losses !== team.losses) { teamData = { ...teamData, losses: parseInt(losses) }}
    if (goalsFor !== team.goalsFor) { teamData = { ...teamData, goalsFor: parseInt(goalsFor) }}
    if (goalsAgainst !== team.goalsAgainst) { teamData = { ...teamData, goalsAgainst: parseInt(goalsAgainst) }}
    if (points !== team.points) { teamData = { ...teamData, points: parseInt(points) } }
    teamData = { ...teamData, goalDifference: parseInt(goalsFor) - parseInt(goalsAgainst) }

    if (!points === ((wins * 3) + draws)) {
      alert("Points must equal (wins * 3) + draws")
    }
    else {
      console.log('teamData @else :>> ', teamData);
      dispatch(updateTeam(teamData))
      navigate(`/teams`)
    }
    console.log('teamData @end:>> ', teamData);
  }

  return (
    <Container component='main' className='page-container'>
      <Box 
        sx={{
          mt: 8,
          mb: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
				  borderRadius: '10px',
				  padding: '15px',
          backgroundColor: 'rgba(155,155,155,0.5)'
        }}
      >
        <Typography variant='h5' color='white' align='center' sx={{ mb: 2 }}>Muokkaa joukkuetta</Typography>
        <img src={team.url} alt={team.name} width="35" height="20" />
        <Typography sx={{ ml: 1 }} variant='button' color='white'>{team.name}</Typography>
        <Box component='form' noValidate onSubmit={handleModify} sx={{ mt: 3, }}>
          <Grid container spacing={5} justifyItems="center">
            <Grid item>
              <TextField
                autoComplete='wins'
                type='number'
                name='wins'
                value={wins}
                // sx={{ width: '75px'}}
                helperText='Voitot'
                onChange={({target}) => setWins(target.value)} min={0} max={25}
              />
            </Grid>
            <Grid item>
              <TextField
                autoComplete='draws'
                type='number'
                name='draws'
                value={draws}
                // sx={{ width: '75px'}}
                helperText='Tasapelit'
                onChange={({target}) => setDraws(target.value)} min={0} max={25}
              />
            </Grid>
            <Grid item>
              <TextField
                autoComplete='losses'
                type='number'
                name='losses'
                value={losses}
                // sx={{ width: '75px'}}
                helperText='Tappiot'
                onChange={({target}) => setLosses(target.value)} min={0} max={25}
              />
            </Grid>
            <Grid item>
              <TextField
                autoComplete='goalsFor'
                type='number'
                name='goalsFor'
                value={goalsFor}
                // sx={{ width: '100px'}}
                helperText='Tehdyt maalit'
                onChange={({target}) => setGoalsFor(target.value)} min={0} max={100}
              />
            </Grid>
            <Grid item>
              <TextField
                autoComplete='goalsAgainst'
                type='number'
                name='goalsAgainst'
                value={goalsAgainst}
                // sx={{ width: '100px'}}
                helperText='Päästetyt maalit'
                onChange={({target}) => setGoalsAgainst(target.value)} min={0} max={100}
              />
            </Grid>
            <Grid item>
              <TextField
                autoComplete='points'
                type='number'
                name='points'
                value={points}
                // sx={{ width: '75px'}}
                helperText='Pisteet'
                onChange={({target}) => setPoints(target.value)} min={0} max={100}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }} justifyItems='center' align='center'>
            <Button variant='outlined' color='error' onClick={(e) => navigate('/teams')}>Cancel</Button>
            <Button variant='contained' color='success' onClick={(e) => handleModify(e)}>Modify team</Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default TeamModifier