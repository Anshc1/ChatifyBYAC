import * as React from 'react';
import { styled, alpha, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Avatar, Hidden } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import LogoutIcon from '@mui/icons-material/Logout'




const fetchNames = async () => {

  const query = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', 'Accept': 'application/json'
    },
  }
  const response = await fetch('/api/serverBackend', query);
  const user = await response.json();
  return user.data;
}
const fetchURL = async () => {
  const query = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', 'Accept': 'application/json'
    },
  }
  var mp = new Map();
  const response = await fetch('/api/serverBackendImage', query)
  await response.json().then((user) => {
    for (const child of user) {
      mp.set(JSON.stringify(child.UID), child.URL)
    }
  });
  return mp;
}

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



export default function NavBarr() {


  const [toHide, settoHide] = useState(false)
  const [Item, setItem] = useState([])



  const handleLogout = () => {
    localStorage.setItem('uid', null);
    localStorage.setItem('userName', null);
    localStorage.setItem('email', null);
    localStorage.setItem('profilePicURL', null);
    Router.push('/login');
  }

  useEffect(() => {

    if (Router.query.email !== undefined) {
      settoHide(true);
    }
    setItem([]);
    fetchURL().then((mp) => {
      fetchNames().then((user) => {
        for (const child of user) {
          const data = {
            name: child.name,
            email: child.email,
            ProfileURL: mp.get((child.UID))
          }
          setItem(current => [...current, data]);
        }
      });
    })
  }, [])
  const handleOnSearch = (string, results) => {
    console.log(string, results)
  }
  const handleOnHover = (result) => {
    console.log(result)
  }

  const handleOnSelect = (item) => {
    Router.push(
      {
        pathname: '/ProfilePage',
        query: {
          name: item.name,
          email: item.email,
          ProfileURL: item.ProfileURL
        },
      })
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item => {
    return (
      <>
        <a href='/ProfilePage'>
          <div style={{ display: 'flex', flexDirection: 'row' }} >
            <Avatar
              alt="Remy Sharp"
              src={item.ProfileURL}
              sx={{ width: 24, height: 24 }}
            />
            <span style={{ display: 'block', textAlign: 'left', paddingLeft: '5px' }}> {item.name}</span>
          </div>
        </a>
        <span style={{ display: 'block', textAlign: 'left' }}> {item.email}</span>
      </>
    )
  });
  const [userName, setuserName] = useState("")
  const [userPic, setuserPic] = useState("")
  if (typeof window !== "undefined" && window.localStorage.getItem('userName') !== null) {
    useEffect(() => {
      setuserName(window.localStorage.getItem('userName'));
      setuserPic(window.localStorage.getItem('profilePicURL'));
    }, [])
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    Router.push('/ProfilePage')
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} disabled={toHide} >Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Verify My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <div>Messages</div>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <div>Notifications</div>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <div>Profile</div>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#2E3B55' }} >
        <Toolbar>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/mainpage"
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
            Chatify
          </Typography>


          <div className="App" >
            <header className="App-header">
              <div style={{ marginLeft: 150,  minWidth:'300px'}} hidden={toHide}>
                <ReactSearchAutocomplete
                  styling={{  height: "27px" , zIndex: 1000 , width: "100px"}}
                  items={Item}
                  fuseOptions={{ keys: ['name', 'email'] }}
                  onSearch={handleOnSearch}
                  onHover={handleOnHover}
                  onSelect={handleOnSelect}
                  onFocus={handleOnFocus}
                  autoFocus
                  formatResult={formatResult}
                />

              </div>
            </header>
          </div>

          <Box sx={{ flexGrow: 1 }} />

          <div style={{ paddingRight: '10px' }}>
            <Avatar alt="Travis Howard" src={userPic} />
          </div>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {userName}
          </Typography>


          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" color="inherit">
              <Badge color="error">
                <LogoutIcon onClick={handleLogout} />
              </Badge>
            </IconButton>
            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  )
}