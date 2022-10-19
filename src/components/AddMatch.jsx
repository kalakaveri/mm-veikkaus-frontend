import { useDispatch, useSelector } from "react-redux"
import React, { useState } from "react"

import { createMatch } from '../reducers/matchReducer'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Select } from "@mui/material";

const AddMatch = ({ toggleVisibility }) => {
  	const teams = useSelector(state => state.teams)
  	const dispatch = useDispatch()
		const theme = createTheme();

	const [homeTeam, setHomeTeam] = useState('')
	const [awayTeam, setAwayTeam] = useState('')

  	const handleSubmit = (e) => {
		e.preventDefault()
    const data = new FormData(e.currentTarget)
		const homeTeamId = teams.filter(team => team.name === homeTeam)[0].id
		const awayTeamId = teams.filter(team => team.name === awayTeam)[0].id
		const match = {
			date: data.get('date'),
			time: data.get('time'),
			homeTeamId: homeTeamId,
			awayTeamId: awayTeamId
		}
    console.log('match :', match)
		dispatch(createMatch(match))
		setHomeTeam('')
		setAwayTeam('')
	}
  	return (
			<ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
						background: 'white', 
						opacity: '0.9',
						borderRadius: '10px',
						padding: '20px'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Lisää ottelu
          </Typography>
          <Box 
						component="form" 
						noValidate 
						onSubmit={handleSubmit} 
						sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="date"
                  name="date"
                  required
                  fullWidth
                  id="date"
                  label="DD-MM-YYYY"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="time"
                  label="HH:MM"
                  name="time"
                  autoComplete="time"
                />
              </Grid>
              <Grid item xs={12} xm={6}>
                <InputLabel id="homeTeam">Kotijoukkue</InputLabel>
                <Select
                  required
                  fullWidth
                  labelId="homeTeam"
                  label="Kotijoukkue"
                  name="homeTeam"
                  autoComplete="homeTeam"
                  value={homeTeam}
                  onChange={(e) => setHomeTeam(e.target.value)}
                >
                  {teams.map(team => <MenuItem key={team.id} value={team.name}>{team.name}</MenuItem>)}
                </Select>
              </Grid>
              <Grid item xs={12} xm={6}>
                <InputLabel id="awayTeam">Vierasjoukkue</InputLabel>
                <Select
                  required
                  fullWidth
                  labelId="awayTeam"
                  label="Vierasjoukkue"
                  name="awayTeam"
                  autoComplete="awayTeam"
                  value={awayTeam}
                  onChange={(e) => setAwayTeam(e.target.value)}
                >
                  {teams.map(team => <MenuItem key={team.id} value={team.name}>{team.name}</MenuItem>)}
                </Select>
              </Grid>
            </Grid>
						<Button
							fullWidth
							variant='contained'
							color='error'
							sx={{ mt:3 }}
							onClick={toggleVisibility}
						>
							Peruuta
						</Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Lisää ottelu
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
		)
}

export default AddMatch