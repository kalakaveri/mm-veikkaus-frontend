import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createGuess, initGuesses } from "../reducers/guessReducer"
import { useEffect } from "react"

import GuessModifier from "./GuessModifier"
import {
  Box,
  Button, 
  Container,
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
  const [guessableMatches, setGuessableMatches] = useState(null)
  const [guessedMatches, setGuessedMatches] = useState([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    dispatch(initGuesses())
    setGuessableMatches(filterMatches())
  }, [dispatch, user.guesses])

  const toggleVisibility = (e) => {
    e.preventDefault()
    setVisible(!visible)
  }
/*
  const handleDeleteAll = (e) => {
    e.preventDefault()
    if (user.role === 'admin') {
      guesses.forEach(guess => {
        dispatch(deleteGuess(guess.id))
      })
    }
    else {
      guessedMatches.forEach(guess => {
        dispatch(deleteGuess(guess.id))
      })
    }
    dispatch(initGuesses())
    setVisible(!visible)
  }
*/
  const dateInFuture = (date, time) => {
    const now = new Date()
    const dateParts = date.split('-')
    const timeParts = time.split(':')
    const dateToComp = new Date(+dateParts[2], dateParts[1]-1, +dateParts[0], +timeParts[0], +timeParts[1])
    return dateToComp > now
  }

  const filterMatches = () => {
    const userGuessedIds = guesses.map(guess => guess.user.username === user.username ? guess.match.id : null)
    const list = []
    matches.forEach(match => {
      if (!userGuessedIds.includes(match.id) && dateInFuture(match.date, match.time)) {
        list.push(match)
      }
    })
    setGuessedMatches(guesses.filter(guess => guess.user.username === user.username && (dateInFuture(guess.match.date, guess.match.time))))
    console.log('guessedMatches :>> ', guessedMatches);
    return list
  }

  const submitGuesses = (e) => {
    e.preventDefault()
    guessableMatches.forEach(m => {
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
          dispatch(createGuess(guess))
        }
      }
    })
    navigate('/')
  }
  return (
    <Container sx={{ mt: '1px', mb: 8 }} >
      {guessedMatches.length > 0 || (user.role === 'admin' && guesses.length > 0)
        ? <Button 
            fullWidth
            variant='contained' 
            color={visible === true ? 'error' : 'success'}
            onClick={toggleVisibility}
          >
            {visible ? 'Lopeta muokkaus' : 'Muokkaa arvauksia'}
          </Button>
        : null
      }
      {visible
        ? (
        <>
          {user && user.role === 'admin'
            ? 
            <Box key='admin-box' direction='column' sm='auto'>
              {guesses.map(g => (
                <>
                <GuessModifier visible={visible} setVisible={setVisible} key={g.id} guess={g} />
                </>
              ))}
            </Box>
            : 
            <Box key='non-admin-box'>
              {guessedMatches.map(g => (
                <GuessModifier visible={visible} setVisible={setVisible} key={g.id} guess={g} />
              ))}
            </Box>
            }
            </>)
        : (
        <div>
          <Typography variant='h3' align='center' color='white' paragraph>Syötä veikkaukset</Typography>
          <TableContainer
            component={'form'}
            sx={{
              borderRadius: 8,
              boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
              background: 'linear-gradient(135deg, rgba(160,159,159,0.4), rgba(160,159,159,0.2))',
              border: '1px solid rgba(255,255,255,0,75)',
              backdropFilter: 'blur(5px)',
            }}
          >
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
                        </Typography>
                        <img src={m.awayTeam.url} alt='' width={'35px'} height={'20px'} />
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