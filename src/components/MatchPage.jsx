import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initMatches } from '../reducers/matchReducer'

import Match from './Match'
import AddMatch from './AddMatch'

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
    <div className='matchPage-container'>
      {user.role === 'admin'
          ? 
            <div className='matchPage-add-form'>
              {visible
                ? <AddMatch toggleVisibility={toggleVisibility} />
                : <button className='addMatch-button' onClick={toggleVisibility}>Lisää ottelu</button>
              }
            </div>
          : null
      }
      <table className='matchPage-table-container'>
        <caption>Kisojen ottelut</caption>
        <thead>
          <tr key='header'>
            <th>Päivämäärä</th>
            <th>Aika</th>
            <th colSpan="2">Kotijoukkue</th>
            <th colSpan="2">Vierasjoukkue</th>
            {user && user.role === 'admin'
              ? <th>Muokkaa</th>
              : null
            }
          </tr>
        </thead>
        <tbody key='table-body' className='matchPage-table-tbody'>
          {matches && matches.length > 0
            ? matches.map(match => (
              <Match key={match.id} match={match} />
              ))
              : <tr key='no-matches'><td>Ei otteluita</td></tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default MatchPage