import React  from 'react';

import { Paper } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="button" color="white" align="right">
      {'Copyright © '}
      <Link color="inherit" to="https://github.com/kalakaveri">
        @kalakaveri
      </Link>{' '}
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
        height: '55px',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
        background: 'linear-gradient(135deg, rgba(160,159,159,0.4), rgba(160,159,159,0.2))',
        backdropFilter: 'blur(5px)', 
      }} 
      direction="column">
	    	<Toolbar className='footer'>
                <Copyright />
                <Typography variant="body1" marginLeft={25}>
                    World Cup 2022 Qatar
                </Typography>
            </Toolbar>
    </Paper>
  )
}

export default Footer