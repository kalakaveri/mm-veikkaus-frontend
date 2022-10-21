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
    	window.matchMedia("(min-width: 1177px)").matches
  )

  useEffect(() => {
    window
    .matchMedia("(min-width: 1177px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);

	const handleLogout = async (event) => {
    dispatch(logout())
	dispatch(navigate('/'))
    dispatch(setNotification('Kirjauduit ulos', 'success'))
  }

	return (
		<AppBar className='navbar-container'>
			<Toolbar className='navbar'>
				<SportsSoccerIcon 
					sx={{ 
						display: { xs: 'flex', md: 'flex' },
						mr: 1,
						position: "fixed", top: 12, left: 35, zIndex: 2000,
					}} 
				/>
				<Typography
						className='navbar-title'
            			variant="h8"
            			noWrap
            			component="a"
            			href="/"
            			sx={{
							position: "fixed", top: 18, left: 80, zIndex: 2000,
            			  	display: { xs: 'flex', md: 'flex' },
            			  	fontFamily: 'monospace',
            			  	fontWeight: 10,
            			  	letterSpacing: '.1rem',
            			  	color: 'inherit',
            			  	textDecoration: 'none',
							pr: 15,
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
							<Tab component={Link} label='Lohkojako' to='/standings' />
							{user && user.role !== 'guest' 
							? 	<Tab component={Link} label='Arvaukset' to='/guesses' />
							: 	null
							}
							{user.role === 'admin'
								? (
									<>
									<Tab component={Link} label='Käyttäjät' to='/users' />
									<Tab component={Link} label='Joukkueet' to='/teams' />
									</>
									)
								: null}
						</Tabs>
						<ButtonGroup sx={{ ml: 10 }} className='nav-auth-container' variant='contained' aria-label='contained primary button group'>
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
					: <NavDrawer fullwidth={'true'} handleLogout={handleLogout} />
				}
					
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
