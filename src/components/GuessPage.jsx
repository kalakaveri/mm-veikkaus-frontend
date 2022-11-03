import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createGuess, initGuesses, deleteGuess } from "../reducers/guessReducer"
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
  }, [])

  const toggleVisibility = (e) => {
    e.preventDefault()
    setVisible(!visible)
  }

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
    setVisible(!visible)
  }

  const filterMatches = () => {
    const userGuessedIds = guesses.map(guess => guess.user.username === user.username ? guess.match.id : null)
    const list = []
    matches.forEach(match => {
      if (!userGuessedIds.includes(match.id)) { 
        list.push(match)
      }
    })
    setGuessedMatches(guesses.filter(guess => guess.user.username === user.username))
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
    <Container className='page-container' sx={{ mt: '1px', mb: 8 }} >
      {(guessedMatches.length > 0) || user.role === 'admin'
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
        ? (
        <>
          {user && user.role === 'admin'
            ? 
            <Box direction='column' sm='auto'>
              {guesses.map(g => (
                <>
                <GuessModifier key={g.id} guess={g} user={user} handleDeleteAll={handleDeleteAll} />
                </>
              ))}
              <Button sx={{ mt: 5 }} fullWidth variant='contained' color='success' onClick={handleDeleteAll}>Poista kaikki arvaukset</Button>
            </Box>
            : 
            <Box>
              {guessedMatches.map(g => (
                <GuessModifier key={g.id} guess={g} user={user} handleDeleteAll={handleDeleteAll} />
              ))}
              <Button sx={{ mt: 5 }} fullWidth variant='contained' color='success' onClick={handleDeleteAll}>Poista kaikki arvaukset</Button>
            </Box>
            }
            </>)
        : (
        <div className='page-container'>
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