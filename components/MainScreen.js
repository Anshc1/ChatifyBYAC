import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import NavBarr from './NavBarr';
import { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, SidebarHeader } from 'react-pro-sidebar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


export default function MainScreen(props) {
  const [flist, setflist] = useState([])
  const [rlist, setrlist] = useState([])
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();

  const handleAccept = async (email) => {
    console.log(email); 
    if (typeof window !== "undefined") {
      const query = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 'Accept': 'application/json'
        },
        body:
          JSON.stringify({
            type: '2',
            email1: email.email,
            email2: window.localStorage.getItem('email'),
          })
      }
      const response = await fetch('/api/serverBackendRelationship', query);
      console.log(response);
    }
  }
  useEffect(() => {
    setflist([])
    setrlist([]);
    props.props.forEach(element => {
      if (element.status) {
        setflist(current => [...current, { email: element.email }]);
      } else {
        setrlist(current => [...current, { email: element.email }]);
      }
    })
  }, [props.props])
  return (
    <div>
      <NavBarr />
      <div style={{ display: 'flex', height: '600px' }}>

        <Sidebar breakPoint='md'>

          <div style={{ flex: 1, marginBottom: '3px', marginTop: '6px' }}>
            <div style={{ padding: '0 24px', marginBottom: '2px' }}>
              <Typography
                variant="body2"
                fontWeight={100}
                fontSize={15}
                style={{ opacity: collapsed ? 0 : .9, letterSpacing: '2px' }}
              >
                Connections
              </Typography>
            </div>
          </div>
          <Menu>
            {flist.map((text, index) => (
              <MenuItem> {text.email}</MenuItem>
            ))}

          </Menu>

          <div style={{ flex: 1, marginBottom: '3px', marginTop: '100px' }}>
            <div style={{ padding: '0 24px', marginBottom: '2px' }}>
              <Typography
                variant="body2"
                fontWeight={100}
                fontSize={15}
                style={{ opacity: collapsed ? 0 : .9, letterSpacing: '2px' }}
              >
                Connection Requests
              </Typography>
            </div>
          </div>
        </Sidebar>
        <Menu>
          {rlist.map((text, index) => (
            <div style={{ display: 'flex' }}>
              <MenuItem style={{ fontSize: "13px" }}> {text.email}</MenuItem>
              <ButtonGroup size="small" variant="outlined" aria-label="outlined button group">
                <Button size='small' color="success" onClick={()=>handleAccept(text)}>
                  Accept
                </Button>
                <Button color="error">
                  Reject
                </Button>
              </ButtonGroup>
            </div>
          ))}

        </Menu>
      </div>
    </div>

  );
}