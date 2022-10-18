import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initMatches } from '../reducers/matchReducer'

import Match from './Match'
import AddMatch from './AddMatch'
import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

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
    <Container className='matchPage-container'>
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
      <Table className='matchPage-table-container'>
        <TableHead>
          <TableRow key='header'>
            <TableCell>Päivämäärä</TableCell>
            <TableCell>Aika</TableCell>
            <TableCell colSpan="2">Kotijoukkue</TableCell>
            <TableCell colSpan="2">Vierasjoukkue</TableCell>
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