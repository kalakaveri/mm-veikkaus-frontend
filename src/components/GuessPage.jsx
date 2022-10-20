import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createGuess, initGuesses } from "../reducers/guessReducer"
import { useEffect } from "react"

import GuessModifier from "./GuessModifier"
import { 
  Button, 
  Container,
  Grid, 
  Box, 
  TableCell,
  TableRow,
  Typography
} from "@mui/material"

const GuessPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  const guesses = useSelector(state => state.guesses)
  const matches = useSelector(state => state.matches)
  const [guessableMatches, setGuessableMatches] = useState([])
  const [visible, setVisible] = useState(false)

  const toggleVisibility = (e) => {
    e.preventDefault()
    setVisible(!visible)
  }

  const notGuessedMatches = () => {
    matches.map(m => {
      console.log('etsitään matsia :>> ', m.id);
      const e = user.guesses.find(g => g.matchId === m.id)
      if (!e) {
        setGuessableMatches([ ...guessableMatches, m ])
      }
    })
  }
  console.log('guessableMatches :>> ', guessableMatches);

  useEffect(() => {
    dispatch(initGuesses())
    setGuessableMatches(notGuessedMatches())
  }, [])

  const submitGuesses = () => {
    const table = document.getElementsByClassName('guessPage-table-tbody')[0]
    const rows = table.getElementsByTagName('tr')
    const modifiedGuesses = []
    for (let i = 0; i < rows.lengTableCell; i++) {
      const row = rows[i]
      const matchId = row.cells[0].innerText
      const homeTeamScore = row.getElementsByClassName('homeTeamScore')[0]
      const awayTeamScore = row.getElementsByClassName('awayTeamScore')[0]
      if (homeTeamScore.defaultValue !== homeTeamScore.value
        && awayTeamScore.defaultValue !== awayTeamScore.value) {
          const userId = user.id
          
          const newGuess = {
            matchId: matchId,
            userId: userId,
            homeTeamScore: homeTeamScore.value,
            awayTeamScore: awayTeamScore.value,
          }
          modifiedGuesses.push(newGuess)
      }
    }
    console.log('@GuessPage:: ', modifiedGuesses)
  }

  return (
    <Container sx={{ mt: '1px', mb: 8 }}>
      {user && user.guesses.length > 0
        ? <Button 
            fullWidth
            variant='contained' 
            color={visible === true ? 'error' : 'success'}
            nClick={toggleVisibility}
          >
            {visible ? 'Peruuta muutokset' : 'Muokkaa arvauksia'}
          </Button>
        : null
      }
      {visible 
        ? (<Grid container className='page-container'>
          {guesses.filter(guess => guess.user.id === user.id).map(g => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={g.id}>
              <GuessModifier key={g.id} guess={g} user={user} />))
            </Grid>))}
          </Grid>)
        : (
        <div>
          <Typography variant='h3' align='center' color='white' paragraph>Syötä veikkaukset</Typography>
          <Box
            component='form'
            noValidate
            onSubmit={submitGuesses}
            sx={{
              borderRadius: 8,
              boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
              background: 'linear-gradient(135deg, rgba(160,159,159,0.4), rgba(160,159,159,0.2))',
              border: '1px solid rgba(255,255,255,0,75)',
              backdropFilter: 'blur(5px)',
              ml: 2,
              mr: 2,
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              
            }}
          >
            {/* <Typography sx={{ mr: 2 }} variant='button' align='center' color='white' >Päivämäärä</Typography>
            <Typography sx={{ mr: 2 }} variant='button' align='center' color='white'>Aika</Typography>
            <Typography sx={{ mr: 2 }} variant='button' align='center' color='white'>Kotijoukkue</Typography>
            <Typography sx={{ mr: 2 }} variant='button' align='center' color='white'>Vierasjoukkue</Typography> */}
              {matches && matches.length > 0
                ? matches.map(match => (
                  <Box align='left' sx={{ ml: 5, display: 'inline' , padding: '5px', width: '100%', }} key={match.id}>
                      <Typography sx={{ ml: 3 }} variant='button' align='center' color='white'>
                        {match.date}
                      </Typography>
                      <Typography sx={{ ml: 3 }} variant='button' align='center' color='white'>
                        {match.time}
                      </Typography>
                      <img src={match.homeTeam.url} alt='' widTableCell={'35px'} height={'20px'} />
                      <Typography sx={{ ml: 3, mr: 3 }} variant='button' align='center' color='white'>
                        {match.homeTeam.name}
                      </Typography>
                    <input className='homeTeamScore' type="number" min={0} max={20} defaultValue={null}/>
                    <input className='awayTeamScore' type="number" min={0} max={20} defaultValue={null} />
                      <Typography sx={{ ml: 3, mr: 3 }} variant='button' align='center' color='white'>
                        {match.awayTeam.name}
                        <img src={match.awayTeam.url} alt='' widTableCell={'35px'} height={'20px'} />
                      </Typography>
                  </Box>
                ))
                : <tr key='no-matches'><TableCell>Olet jo syöttänyt arvaukset</TableCell></tr>
              }
          </Box>
          <Button
            type='submit' 
            color='primary' 
            variant='contained' 
            onClick={submitGuesses}
            fullWidth
          >
            Lähetä veikkaukset
          </Button>
          </div>
        )
      }
    </Container>
  )
}

export default GuessPage