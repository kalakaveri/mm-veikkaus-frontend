import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/icons-material/PersonOutline';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuIcon from "@mui/icons-material/Menu";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'

const guestPages = [{nimi: 'Etusivu', url:  '/'}, {nimi:'Pistetaulukko', url: '/points'}, {nimi:'Ottelut', url: '/matches'}, {nimi: 'Lohkojako', url: '/standings'}]
const userPages = [{nimi:'Arvaukset', url:  '/guesses' }]
const adminPages = [{nimi: 'Käyttäjät', url:  '/users', nimi: 'Joukkueet', url: '/teams'}]
const logPages = [{nimi: 'Kirjaudu sisään', url: '/login'}, {nimi: 'Rekisteröidy', url: '/register'}]

const NavDrawer = ({ handleLogout }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const user = useSelector(state => state.auth)
  const navigate = useNavigate()

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Toolbar disableGutters>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <SportsSoccerIcon className='svg_icons' sx={{ size: 'small', display: { xs: 'flex', md: 'flex' }, ml: 10, mt: 5, mb: 5, }} />
				<Typography
						className='navbar-title'
            variant="h8"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 5,
              mb: 5,
              display: { xs: 'flex', md: 'flex' },
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
        <List>
          {guestPages.map(p => (
            <ListItemButton onClick={() => setOpenDrawer(!openDrawer)} key={p.nimi} component={Link} to={p.url}>
              <ListItemIcon>
                <ListItemText>{p.nimi}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
        {!user
          ? <List>
              {logPages.map(p => (
                <ListItemButton onClick={() => setOpenDrawer(!openDrawer)} key={p.nimi} component={Link} to={p.url}>
                  <ListItemIcon>
                    <ListItemText>{p.nimi}</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              ))}
            </List>
          : <List>
              {userPages.map(p => (
                <ListItemButton onClick={() => setOpenDrawer(!openDrawer)} key={p.nimi} component={Link} to={p.url}>
                  <ListItemIcon>
                    <ListItemText>{p.nimi}</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              ))}
              {user.role === 'admin'
                ?<List>
                {adminPages.map(p => (
                  <ListItemButton onClick={() => setOpenDrawer(!openDrawer)} key={p.nimi} component={Link} to={p.url}>
                    <ListItemIcon>
                      <ListItemText>{p.nimi}</ListItemText>
                    </ListItemIcon>
                  </ListItemButton>
                ))}
                </List>
                : null
              }
            {user && user.role !== 'guest'
              ? 
                <ListItemButton onClick={() => {
                  setOpenDrawer(!openDrawer)
                  handleLogout()}
                  } 
                  key='logout'
                >
                  <ListItemIcon>
                    <ListItemText>Kirjaudu ulos</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
            : 
              <>
              <ListItemButton onClick={() => {
                setOpenDrawer(!openDrawer)
                navigate('/login')}
              }
                key='login'
              >
                <ListItemIcon>
                  <ListItemText>Kirjaudu sisään</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton onClick={() => {
                setOpenDrawer(!openDrawer)
                navigate('/register')}
              }
                key='register'
              >
                <ListItemIcon>
                  <ListItemText>Rekisteröidy</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              </>
          }
          </List>
        }
      </Drawer>
      {/* <IconButton
        align='right'
        sx={{ color: "white", position: "fixed", top: 5, right: , zIndex: 2000 }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton> */}
      <Box sx={{ color: 'white', flexGrow: 0, position: "fixed", top: 5, right: 12, zIndex: 2000 }}>
          {user && user.role !== 'guest'
          ? 
          <>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Icon />
              </IconButton>
            </Tooltip>
            <Menu
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
              sx={{ mt: '45px' }}
            >
              <MenuItem key={user.id} onClick={handleCloseUserMenu} >
                <Typography textAlign="center">
                  {user.username} - {isNaN(parseInt(user.points)) ? 0 : parseInt(user.points)} pistettä
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => {
                handleCloseUserMenu()
                handleLogout()}
                } 
                key='logout'
              >
                <Typography variant='button' color='success' textAlign="center">
                  Kirjaudu ulos
                </Typography>
              </MenuItem>
            </Menu>
            <IconButton
              align='right'
              sx={{ color: "white", position: "fixed", top: 5, right: 45, zIndex: 2000 }}
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              <MenuIcon color="white" />
            </IconButton>
            </>
          : 
          <IconButton
            align='right'
            sx={{ color: "white", position: "fixed", top: 5, right: 12, zIndex: 2000 }}
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            <MenuIcon color="white" />
          </IconButton>
          }
      </Box>
    </Toolbar>
  );
};

export default NavDrawer