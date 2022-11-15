import React  from 'react';

import { Paper } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Copyright() {
  return (
    <Typography variant="button" fontSize='small' color="white" align="right" sx={{ position: 'fixed', top: 0, left: 5 }}>
      {'Copyright ©'}
      <a href="https://github.com/kalakaveri">
        @Topias
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Paper 
      sx={{
        position: 'fixed',
        bottom: 0, 
        left: 0, 
        right: 0, 
        height: '25px',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
        background: 'linear-gradient(135deg, rgba(160,159,159,0.4), rgba(160,159,159,0.2))',
        backdropFilter: 'blur(5px)', 
      }} 
      direction="column">
	    	<Toolbar>
          <Copyright />
          <Typography color='white' fontSize='small' variant="button" sx={{ position: 'fixed', top: 0, right: 5 }}>
              World Cup 2022 Qatar
          </Typography>
        </Toolbar>
    </Paper>
  )
}

export default Footer