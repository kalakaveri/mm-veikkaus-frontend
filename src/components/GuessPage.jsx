import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createGuess, initGuesses } from "../reducers/guessReducer"
import { useEffect } from "react"

import GuessModifier from "./GuessModifier"
import { 
  Button, 
  Container,
  Grid, 
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material"
import { useNavigate } from "react-router-dom"

const GuessPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const guesses = useSelector(state => state.guesses)
  const matches = useSelector(state => state.matches)
  const user = useSelector(state => state.auth)
  const [guessableMatches, setGuessableMatches] = useState([])
  const [visible, setVisible] = useState(false)

  const toggleVisibility = (e) => {
    e.preventDefault()
    setVisible(!visible)
  }

  const isSameMatch = (a, b) => a.id === b.id
  const onlyInLeft = (left, right, compareFunction) => 
    left.filter(leftValue =>
      !right.some(rightValue => 
        compareFunction(leftValue, rightValue)));
  
  useEffect(() => {
    dispatch(initGuesses())
    setGuessableMatches(onlyInLeft(matches, guesses, isSameMatch))
  }, [])

  const submitGuesses = (e) => {
    e.preventDefault()
    // const data = new FormData(e.currentTarget)
    matches.map(m => {
      const homeTeamScore = document.getElementById(`${m.id}-homeTeamScore`).value
      const awayTeamScore = document.getElementById(`${m.id}-awayTeamScore`).value
      const userId = user.id

      if (homeTeamScore && awayTeamScore) {
        if (user.guesses.find(g => g.matchId === m.id) === undefined) {
          const guess = {
            homeTeamScore: parseInt(homeTeamScore),
            awayTeamScore: parseInt(awayTeamScore),
            matchId: m.id,
            userId: userId
          }
          console.log('guess :', guess)
          dispatch(createGuess(guess))
          navigate('/')
        }
      }
    })
  }
  console.log('user :', user)
  console.log('user.guesses.length :', user.guesses.length)
  return (
    <Container sx={{ mt: '1px', mb: 8 }}>
      {user && user.guesses.length > 0
        ? <Button 
            fullWidth
            variant='contained' 
            color={visible === true ? 'error' : 'success'}
            onClick={toggleVisibility}
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
          <TableContainer component={'form'}>
            <Table aria-label='guess table' sx={{ minWidth: '820px' }}>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>
                    <Typography sx={{ mr: 2 }} variant='button' align='center' color='white' >
                      PVM
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography sx={{ mr: 2 }} variant='button' align='center' color='white'>
                      Aika
                    </Typography>
                  </TableCell>
                  <TableCell align='center' colSpan={2}>
                    <Typography sx={{ mr: 2 }} variant='button' align='center' color='white'>
                      Kotijoukkue
                    </Typography>
                  </TableCell>
                  <TableCell align='center' colSpan={2}>
                    <Typography sx={{ mr: 2 }} variant='button' align='center' color='white'>
                      Vierasjoukkue
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {guessableMatches && guessableMatches.length > 0
                  ? guessableMatches.map(m => (
                    <TableRow key={m.id}>
                      <TableCell align='center'>
                        <Typography variant='button' align='center' color='white'>
                          {m.date}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='button' align='center' color='white'>
                          {m.time}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <img src={m.homeTeam.url} alt='' width={'35px'} height={'20px'} />
                        <Typography sx={{ ml: 3 }} variant='button' align='center' color='white'>
                          {m.homeTeam.name}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <TextField
                          id={`${m.id}-homeTeamScore`}
                          name={`${m.id}-homeTeamScore`}
                          autoComplete={`${m.id}-homeTeamScore`}
                          type='number'
                          inputProps={{ min: 0, max: 20, type: 'number' }}
                          variant='filled'
                          size='small'
                          align='center'
                          sx={{ 
                            width: 75,
                            border: '1px solid white', 
                            borderRadius: 2, 
                            input: { color: 'white' },
                            style: { textAlign: 'center' },
                          }}
                        />
                      </TableCell>
                      <TableCell align='center'>
                        <TextField
                          id={`${m.id}-awayTeamScore`}
                          name={`${m.id}-awayTeamScore`}
                          autoComplete={`${m.id}-awayTeamScore`}
                          type='number'
                          inputProps={{ min: 0, max: 20, type: 'number' }}
                          variant='filled'
                          size='small'
                          sx={{ 
                            width: 75,
                            border: '1px solid white', 
                            borderRadius: 2, 
                            input: { color: 'white' },
                            style: { textAlign: 'center' },
                          }}
                        />
                      </TableCell>
                      <TableCell align='right'>
                        <Typography sx={{ mr: 3 }} variant='button' align='center' color='white'>
                          {m.awayTeam.name}
                          <img src={m.awayTeam.url} alt='' width={'35px'} height={'20px'} />
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                  : 
                  (<TableRow>
                    <TableCell align='center' colSpan={6}>
                      <Typography variant='button' align='center' color='white'>
                        Ei enää arvattavia otteluita, voit kuitenkin ylhäältä muokata arvauksia.
                      </Typography>
                    </TableCell>
                  </TableRow>)
                }
              </TableBody>
            </Table>
            <Button
              type='submit' 
              color='primary' 
              variant='contained' 
              onClick={submitGuesses}
              fullWidth
            >
              Lähetä veikkaukset
            </Button>
          </TableContainer>
        </div>
      )}
    </Container>
  )
}

export default GuessPage