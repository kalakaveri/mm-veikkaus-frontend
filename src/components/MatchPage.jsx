import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initMatches } from '../reducers/matchReducer'

import Match from './Match'
import AddMatch from './AddMatch'
import { 
  Button, 
  Container, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Typography
} from '@mui/material'

const MatchPage = () => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const matches = useSelector(state => state.matches)
  const user = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(initMatches())
  }, [dispatch])

  const toggleVisibility = (e) => {
    e.preventDefault()
    setVisible(!visible)
  }

  return (
    <Container>
      {user.role === 'admin'
          ? 
            <div className='matchPage-add-form'>
              {visible
                ? <AddMatch toggleVisibility={toggleVisibility} />
                : <Button 
                    fullWidth 
                    variant='contained' 
                    onClick={toggleVisibility}
                    sx={{ mb: 2, mt: 2, alignSelf: 'center', borderRadius: 2, position: 'top' }}
                  >
                    Lisää ottelu
                  </Button>
              }
            </div>
          : null
      }
      <Table>
        <TableHead>
            <TableRow>
                <TableCell colSpan={7} align='center' background-color='white'>
                    <Typography variant='h6' align='center' color='white'>
                        Turnauksen ottelut
                    </Typography>
                </TableCell>
            </TableRow>
            <TableRow key='header'>
                <TableCell align='center'>
                    <Typography variant='button' align='center' color='white'>
                        Päivämäärä
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant='button' align='center' color='white'>
                    Aika
                    </Typography>
                </TableCell>
                <TableCell colSpan="2">
                    <Typography variant='button' align='center' color='white'>
                        Kotijoukkue
                    </Typography>
                </TableCell>
                <TableCell colSpan="2">
                    <Typography variant='button' align='center' color='white'>
                        Vierasjoukkue
                    </Typography>
                </TableCell>
            {user && user.role === 'admin'
              ? <TableCell>Muokkaa</TableCell>
              : null
            }
          </TableRow>
        </TableHead>
        <TableBody key='table-body' className='matchPage-table-tbody'>
          {matches && matches.length > 0
            ? matches.map(match => (
              <Match key={match.id} match={match} />
              ))
              : <TableRow key='no-matches'><TableCell>Ei otteluita</TableCell></TableRow>
          }
        </TableBody>
      </Table>
    </Container>
  )
}

export default MatchPage