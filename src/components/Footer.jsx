import React  from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="white" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://github.com/kalakaveri">
        kalakaveri
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => {
  return (
    <div className='footer'>
      <em>Kisaveikkaus toteutettu Qatar MM 2022 -kisoja varten</em>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  )
}

export default Footer