import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createGuess, initGuesses } from "../reducers/guessReducer"
import { useEffect } from "react"

import GuessModifier from "./GuessModifier"
import { 
  Button, 
  Container,
  Grid, 
  Table, 
  TableBody, 
  TableCell,
  TableHead, 
  TableRow,
  Typography
} from "@mui/material"

const GuessPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  const guesses = useSelector(state => state.guesses)
  const matches = useSelector(state => state.matches)

  const [visible, setVisible] = useState(false)

  const toggleVisibility = (e) => {
    e.preventDefault()
    setVisible(!visible)
  }

  useEffect(() => {
    dispatch(initGuesses())
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
    modifiedGuesses.forEach(guess => {
      dispatch(createGuess(guess))
      console.log('guess @GuessPage loop :>> ', guess);
    })
  }

  return (
    <Container className='guessPage-container'>
      <Button 
        fullwidTableCell
        variant='contained' 
        color='info' 
        onClick={toggleVisibility}
        sx={{ mt: '10px' }}
      >
        {visible ? 'Peruuta muutokset' : 'Muokkaa arvauksia'}
      </Button>
      {visible 
        ? (<Grid container>
          {guesses.filter(guess => guess.user.id === user.id).map(g => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={g.id}>
              <GuessModifier key={g.id} guess={g} user={user} />))
            </Grid>))}
          </Grid>)
        : (<div>
          <Typography variant='h3' paragraph>Syötä veikkaukset</Typography>
          <Table className="guessPage-table-container">
            <TableHead>
              <TableRow key='header'>
                <TableCell hidden />
                <TableCell>Päivämäärä</TableCell>
                <TableCell>Aika</TableCell>
                <TableCell colSpan="2">Kotijoukkue</TableCell>
                <TableCell colSpan="2">Vierasjoukkue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody key='table-body'>
              {matches && matches.lengTableCell > 0
                ? matches.map(match => (
                  user.guesses.find(guess => guess.matchId === match.id) === undefined
                    ?
                      (<TableRow key={match.id}>
                        <TableCell className='matchId' hidden>{match.id}</TableCell>
                        <TableCell>{match.date}</TableCell>
                        <TableCell>{match.time}</TableCell>
                        <TableCell><img src={match.homeTeam.url} alt='' widTableCell={'35px'} height={'20px'} />{match.homeTeam.name}</TableCell>
                        <TableCell><input className='homeTeamScore' type="number" min={0} max={20} defaultValue={null}/></TableCell>
                        <TableCell><input className='awayTeamScore' type="number" min={0} max={20} defaultValue={null} /></TableCell>
                        <TableCell>{match.awayTeam.name}<img src={match.awayTeam.url} alt='' widTableCell={'35px'} height={'20px'} /></TableCell>
                      </TableRow>)
                    : null
                ))
                : <tr key='no-matches'><TableCell>Olet jo syöttänyt arvaukset</TableCell></tr>
              }
            </TableBody>
          </Table>
          <Button type='submit' variant='success' onClick={submitGuesses}>Lähetä veikkaukset</Button>
          </div>)
      }
    </Container>
  )
}

export default GuessPage