import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import {
  LocalPizza as PizzaIcon,
  ListAlt as OrdersIcon,
  Add as AddMenuIcon,
  Group as RoleIcon,
  Person as UserIcon,
  Menu as MenuIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import Orders from './Orders';
import AddMenu from './AddMenu';
import Role from './Role';
import User from './User';

const drawerWidth = 240;

const Dashboard = () => {
  const [currentComponent, setCurrentComponent] = useState('orders');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [title, setTitle] = useState('Pizza Dashboard');
  const { logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 'orders':
        return <Orders />;
      case 'addMenu':
        return <AddMenu />;
      case 'role':
        return <Role />;
      case 'user':
        return <User />;
      default:
        return <Orders />;
    }
  };

  const handleMenuClick = (text) => {
    setCurrentComponent(text);
    setTitle(text.charAt(0).toUpperCase() + text.slice(1));
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: 'white', maxWidth: '100vw', overflow: 'hidden' }}>
      <AppBar position="fixed" sx={{ bgcolor: 'white' }}>
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color='black' sx={{ ml: { sm: `${drawerWidth}px` } }} noWrap>
            {title} 
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          display: { xs: 'none', sm: 'block' },
        }}
        variant="permanent" 
        anchor="left"
      >
        <Box sx={{ padding: 2, textAlign: 'center' }}>
          <Typography variant="h4">PIZZA</Typography>
          <PizzaIcon sx={{ fontSize: 50 }} />
        </Box>
        <List>
          {['orders', 'addMenu', 'role', 'user'].map((text) => (
            <ListItem
              button
              key={text}
              onClick={() => handleMenuClick(text)}
              sx={{
                backgroundColor: currentComponent === text ? 'orange' : 'transparent',
                '&:hover': { backgroundColor: 'rgba(255, 102, 0, 0.2)', cursor: 'pointer' },
              }}
            >
              <ListItemIcon>
                {text === 'orders' ? <OrdersIcon /> : text === 'addMenu' ? <AddMenuIcon /> : text === 'role' ? <RoleIcon /> : <UserIcon />}
              </ListItemIcon>
              <ListItemText primary={text.charAt(0).toUpperCase() + text.slice(1)} />
            </ListItem>
          ))}
        </List>
        <hr style={{ margin: '20px 0', borderColor: '#FF6600' }} /> 
        <List>
          <ListItem button onClick={logout} sx={{ '&:hover': {cursor: 'pointer'  } }}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: 'red'}} /> 
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: 'red' }} /> 
          </ListItem>
        </List>
      </Drawer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' }, 
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
      >
        <Box sx={{ padding: 2, textAlign: 'center' }}>
          <Typography variant="h4">PIZZA</Typography>
          <PizzaIcon sx={{ fontSize: 50 }} />
        </Box>
        <List onClick={handleDrawerToggle}>
          {['orders', 'addMenu', 'role', 'user'].map((text) => (
            <ListItem
              button
              key={text}
              onClick={() => handleMenuClick(text)}
              sx={{
                backgroundColor: currentComponent === text ? 'orange' : 'transparent', 
                '&:hover': { backgroundColor: 'rgba(255, 102, 0, 0.2)', cursor: 'pointer' },
              }}
            >
              <ListItemIcon>
                {text === 'orders' ? <OrdersIcon /> : text === 'addMenu' ? <AddMenuIcon /> : text === 'role' ? <RoleIcon /> : <UserIcon />}
              </ListItemIcon>
              <ListItemText primary={text.charAt(0).toUpperCase() + text.slice(1)} />
            </ListItem>
          ))}
        </List>
        <hr style={{ margin: '20px 0', borderColor: '#FF6600' }} />
        <List>
          <ListItem
            button
            onClick={logout}sx={{
              '&:hover': { backgroundColor: 'rgba(255, 102, 0, 0.2)', cursor: 'pointer' },
            }}
          >
            <ListItemIcon>
              <LogoutIcon sx={{ color: 'red' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: 'red' }} />
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          width: { sm: `calc(100% - ${drawerWidth}px)`, xs: '100%' },
          overflowY: 'auto', 
        }}
      >
        {renderComponent()}
      </Box>
    </Box>
  );
};

export default Dashboard;
