import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/icons-material/PersonOutline';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/authReducer';
import { Link } from 'react-router-dom';

const guestPages = [{nimi: 'Etusivu', url:  '/'}, {nimi:'Pistetaulukko', url: '/points'}, {nimi:'Ottelut', url: '/matches'}, {nimi: 'Sarjataulukko', url: '/standings'}]
const userPages = [{nimi:'Arvaukset', url:  '/guesses' }]
const adminPages = [{nimi: 'Käyttäjät', url:  '/users'}]
const logPages = [{nimi: 'Kirjaudu sisään', url: '/login'}, {nimi: 'Rekisteröidy', url: '/register'}]

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector(state => state.auth)

  const handleLogout = async (event) => {
    dispatch(logout())
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SportsSoccerIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MM-VEIKKAUS PC
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {guestPages.map(p => console.log('p.nimi: ', p.nimi, 'p.url :', p.url) || (
                <Link to={p.url} key={p.nimi} style={{ textDecoration: 'none' }}>
                <MenuItem key={p.nimi} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                      {p.name}
                  </Typography>
                </MenuItem>
                </Link>
              ))}
              {user && user.role !== 'guest'
                ? userPages.map(p => (
                    <MenuItem key={p.nimi} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link component='button' to={p.url} style={{ textDecoration: 'none', color: 'green' }}>
                          {p.name}
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))
                : null}
              {user && user.role === 'admin'
                ? adminPages.map(p => (
                  <MenuItem key={p.nimi} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link component='button' to={p.url} style={{ textDecoration: 'none', color: 'green' }}>
                        {p.name}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))
                : null}
            </Menu>
          </Box>
          <SportsSoccerIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MM-VEIKKAUS PUH
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {guestPages.map((p) => (
              <Button
                key={p.nimi}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {p.nimi}
              </Button>
            ))}
            {user && user.role !== 'guest'
              ? userPages.map((p) => (
                  <Button
                    key={p.nimi}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {p.nimi}
                  </Button>
                ))
              : null}
            {user && user.role === 'admin'
              ? adminPages.map((p) => (
                  <Button
                    key={p.nimi}
                    onClick={handleCloseNavMenu}  
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {p.nimi}
                  </Button>
                ))
              : null}
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
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Icon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={user.id} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  {user.username} - {isNaN(parseInt(user.points)) ? 0 : parseInt(user.points)} pistettä
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;