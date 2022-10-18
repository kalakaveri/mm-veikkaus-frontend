/** @format */
import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/authReducer';
import { setNotification } from '../reducers/notificationReducer';

import {
  AppBar,
  Button,
	ButtonGroup,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from 'react-router-dom';
import NavDrawer from './NavDrawer';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(state => state.auth);

	const [value, setValue] = useState(0);
	const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);

	const handleLogout = async (event) => {
    dispatch(logout())
    dispatch(setNotification(`Logged out`, 'success'))
  }

	return (
		<AppBar className='navbar-container' position='static' sx={{ background: '#fdcece' }}>
			<Toolbar className='navbar'>
				<SportsSoccerIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
				<Typography
						className='navbar-title'
            variant="h8"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 1,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
							pr: 5,
            }}
          >
            MM-VEIKKAUS
        </Typography>
				{matches 
					? (
						<>
						<Tabs
						  sx={{ marginLeft: "auto" }}
              indicatorColor="secondary"
              textColor="inherit"
              value={value}
              onChange={(e, value) => setValue(value)}
						>
							<Tab component={Link} label="Etusivu" to='/' />
							<Tab component={Link} label='Pistetaulukko' to='/points' />
							<Tab component={Link} label='Ottelut' to='/matches' />
							<Tab component={Link} label='Sarjataulukko' to='/standings' />
							{user.role === 'admin'
								? (
									<>
									<Tab component={Link} label='Käyttäjät' to='/users' />
									<Tab component={Link} label='Joukkueet' to='/teams' />
									</>
									)
								: null}
								{user && user.role !== 'guest' 
								? 	<Tab component={Link} label='Arvaukset' to='/guesses' />
								: 	null
								}
						</Tabs>
						<ButtonGroup className='nav-auth-container' variant='contained' aria-label='contained primary button group'>
						{!user || user.role === 'guest'
							? 
								(<>
									<Button sx={{ marginLeft: 'auto' }} onClick={() => navigate('/login')}>Kirjaudu sisään</Button>
									<Button sx={{ marginLeft: '10px' }} onClick={() => navigate('/register')}>Rekisteröidy</Button>
								</>)
							:
							<Button sx={{ marginLeft: 'auto' }} className='navbar-logout' onClick={() => {
								handleLogout()
								navigate('/');
							}}>Kirjaudu ulos</Button>
						}
						</ButtonGroup>
						</>
						)
					: (
						<>
						<NavDrawer handleLogout={handleLogout} />
						</>
					)
				}
					
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
