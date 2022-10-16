/** @format */

import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/authReducer';
import { setNotification } from '../reducers/notificationReducer';

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = useSelector(state => state.auth);

	const handleLogout = async (event) => {
    dispatch(logout())
    dispatch(setNotification(`Logged out`, 'success'))
  }

	return (
		<div className='navbar-container'>
			<div className='navbar'>
			<button className='nav-button' onClick={() => navigate('/')}>Etusivu</button>
			<button className='nav-button' onClick={() => navigate('/points')}>Pistetaulukko</button>
			<button className='nav-button' onClick={() => navigate('/matches')}>Ottelut</button>
			<button className='nav-button' onClick={() => navigate('/standings')}>Sarjataulukko</button>
			{user.role === 'admin'
				? 	(
					<>
						<button className='nav-button' onClick={() => navigate('/users')}>Käyttäjät</button>
						<button className='nav-button' onClick={() => navigate('/teams')}>Joukkueet</button>
					</>
					)
				: 	null
			}
      		{user && user.role !== 'guest' 
				? 	<button className='nav-button' onClick={() => navigate('/guesses')}>Arvaukset</button>
				: 	null
			}
			{!user || user.role === 'guest'
				? 
					(<>
						<button className='nav-auth' onClick={() => navigate('/login')}>Kirjaudu sisään</button>
						<button className='nav-auth' onClick={() => navigate('/register')}>Rekisteröidy</button>
					</>)
				:
				<button className='navbar-logout' onClick={() => {
					handleLogout()
					navigate('/');
				}}>Kirjaudu ulos</button>
			}
			
			<Outlet />
			</div>
		</div>
	);
};

export default Navbar;
