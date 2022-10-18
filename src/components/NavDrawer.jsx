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
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuIcon from "@mui/icons-material/Menu";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'

const guestPages = [{nimi: 'Etusivu', url:  '/'}, {nimi:'Pistetaulukko', url: '/points'}, {nimi:'Ottelut', url: '/matches'}, {nimi: 'Lohkojako', url: '/standings'}]
const userPages = [{nimi:'Arvaukset', url:  '/guesses' }]
const adminPages = [{nimi: 'Käyttäjät', url:  '/users'}]
const logPages = [{nimi: 'Kirjaudu sisään', url: '/login'}, {nimi: 'Rekisteröidy', url: '/register'}]

const NavDrawer = ({ handleLogout }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const user = useSelector(state => state.auth)

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
          </List>
        }
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
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
          {user
          ?<MenuItem key={user.id} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">
              {user.username} - {isNaN(parseInt(user.points)) ? 0 : parseInt(user.points)} pistettä
            </Typography>
          </MenuItem>
          : null}
        </Menu>
      </Box>
    </Toolbar>
  );
};

export default NavDrawer