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
import { useState , useEffect } from 'react';


const drawerWidth = 240;

export default function MainScreen(props) {
  const [flist, setflist] = useState([]) 
  useEffect(() => {
    setflist([])
    props.props.forEach(element => {
      setflist(current => [...current, {email : element.email , status : element.Status} ]);
    })
  }, [props.props])
  console.log(flist);
  return (
    <div>
      <Box sx={{ display: 'flex' }} >
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <NavBarr />
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}  >
          
          <List>
          
          <Divider />
           {flist.map((text, index) => (
             <ListItem key={text.email} disablePadding>
               <ListItemButton>
                 <ListItemText primary={text.email} />
               </ListItemButton>
             </ListItem>
           ))}
          </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
        </Box>
      </Box>
    </div>
  );
}
