/** @format */
import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/authReducer';

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

const guestFlow = [{nimi: 'Etusivu', url: '/'}, {nimi: 'Pistetilanne', url: '/points'}, {nimi: 'Ottelut', url: '/matches'}, {nimi: 'Lohkojako', url: '/standings'}]
const userFlow = [ ...guestFlow, {nimi: 'Arvaukset', url: '/guesses'} ]
const adminFlow = [	...userFlow, {nimi: 'Käyttäjät', url: '/users'}, {nimi: 'Joukkueet', url: '/teams'}]

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(state => state.auth);

	const [value, setValue] = useState(0);
	const [matches, setMatches] = useState(
    	window.matchMedia("(min-width: 960px)").matches
    )

    const buildUserFlow = (role) => {
	    switch (role){
		    case 'admin':
			    return (adminFlow.map(p => <Tab key={p.url} label={p.nimi} component={Link} to={p.url} />))
		    case 'guesser':
			    return (userFlow.map(p => <Tab key={p.url} label={p.nimi} component={Link} to={p.url} />))
		    default:
			    return (guestFlow.map(p => <Tab key={p.url} label={p.nimi} component={Link} to={p.url} />))
		}
	}

  useEffect(() => {
    window
    .matchMedia("(min-width: 960px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);

	const handleLogout = async (event) => {
    dispatch(logout())
		navigate('/')
    }

	return (
		<AppBar className='navbar-container'>
			<Toolbar className='navbar'>
				<SportsSoccerIcon 
					sx={{
						display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' },
						mr: 1,
						position: "fixed", top: 12, left: 35, zIndex: 2000,
						overflow: 'hidden',
					}} 
				/>
				<Typography
						className='navbar-title'
            			variant="h8"
            			noWrap
            			component="a"
            			href="/"
            			sx={{
							position: "fixed", top: 16, left: 80, zIndex: 2000,
                            display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'flex', xl: 'flex' },
							overflow: 'hidden',
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
              				indicatorColor="secondary"
              				textColor="inherit"
              				value={value}
              				onChange={(e, value) => setValue(value)}
						>
							{buildUserFlow(user.role)}
						</Tabs>
						<ButtonGroup sx={{ ml: 5 }} className='nav-auth-container' variant='contained' aria-label='contained primary button group'>
						{!user || user.role === 'guest'
							? 
								(<>
									<Button color='success' size='small' onClick={() => navigate('/login')}>Kirjaudu sisään</Button>
									<Button color='info' size='small' onClick={() => navigate('/register')}>Rekisteröidy</Button>
								</>)
							:
							<Button color='info' size='small' className='navbar-logout' onClick={() => {
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
