import React  from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: '100vw',
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          align: 'left',
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            Toteutettu MM 2022 Qatarin jalkapallokisojen veikkaussovellukseksi.
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  )
}

export default Footer