import Team from "./Team"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initTeams } from '../reducers/teamReducer'

const GROUPS = ['A','B','C','D','E','F','G','H']

const TeamsPage = () => {
  const dispatch = useDispatch()
  const teams = useSelector(state => state.teams)
  
  useEffect(() => {
    dispatch(initTeams())
  }, [dispatch])

  return (
    <div id='teams-container'>
      <h1 id='teams-header'>Teams</h1>
      {GROUPS.map(group => (
        <div id='team-group-container' key={group}>
          <h2 id='group-header'>Group {group}</h2>
          <div id='group-teamlist-container'>
            {teams.filter(team => team.group === group).map(team => (
              <Team key={team.id} team={team} />
            ))}
          </div>
        </div>)
      )}
    </div>
  )
}

export default TeamsPage