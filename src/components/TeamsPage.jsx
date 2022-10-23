import Team from "./Team"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initTeams } from '../reducers/teamReducer'
import {
    Container,
    Typography,
    Box,
    List,
}   from '@mui/material'

const GROUPS = ['A','B','C','D','E','F','G','H']

const TeamsPage = () => {
  const dispatch = useDispatch()
  const teams = useSelector(state => state.teams)
  
  useEffect(() => {
    if (!teams || teams.length === 0) {
        dispatch(initTeams())
    }
  }, [dispatch, teams])

  return (
    <Container align='center' sx={{ mb: 7,  }} minwidth='400px'>
        {GROUPS.map(group => (
            <Box
                width={{ md: '45%', lg: '35%' }}
                key={group}
                sx={{
                    borderRadius: 8,
                    boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
                    background: 'linear-gradient(135deg, rgba(160,159,159,0.4), rgba(160,159,159,0.2))',
                    border: '1px solid rgba(255,255,255,0,75)',
                    backdropFilter: 'blur(5px)',
                    ml: 2,
                    mr: 2,
                    mt: 2,
                }}
            >
                <List >
                    <Typography variant='h6' align='center'>Lohko {group}</Typography>
                    {teams.filter(team => team.group === group).map(team => (
                        <Team key={team.id} team={team} />
                    ))}
                </List>
            </Box>)
        )}
    </Container>
  )
}

export default TeamsPage