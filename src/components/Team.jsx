/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Button,
    ListItem,
    Typography,
}   from '@mui/material'


const Team = ({ team }) => {
  const navigate = useNavigate();

  const auth = useSelector(state => state.auth);
  const teams = useSelector(state => state.teams);

  const { teamId } = useParams()
  if (teamId || teamId !== undefined) {
    const team = teams.find(t => t.id === teamId)
  }

  const handleModify = (e) => {
    e.preventDefault();
    if (teamId) {
      navigate('modify');
    }
    else {
      navigate(`${team.id}/modify`);
    }
  };

  return (
    <ListItem key={team.id}>
        <Box
            sx={{
                width: '100%',
                padding: 0.25,
            }}>
            <img src={team.url} alt={team.name} width="35" height="20" />
            <Typography color='white' variant='button' sx={{ ml: 2 }}>
              {team.name}
            </Typography>
            {auth.role !== 'admin'
              ? null
              : 
                <Button
                    size='small'
                    sx={{ ml: 5,
                        position: 'absolute',
                        top: 10,
                        right: 15
                    }}
                    variant='contained'
                    color='success'
                    onClick={(e) => handleModify(e)}
                >
                    Muokkaa
                </Button>
            }
        </Box>
    </ListItem>
  );
}

export default Team