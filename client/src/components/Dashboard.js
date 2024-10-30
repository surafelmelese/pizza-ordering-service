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
  ExitToApp as LogoutIcon // Import logout icon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import Orders from './Orders';
import AddMenu from './AddMenu';
import Role from './Role';
import User from './User';

const drawerWidth = 240;

const Dashboard = () => {
  const [currentComponent, setCurrentComponent] = useState('orders');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [title, setTitle] = useState('Pizza Dashboard'); // State for title
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
    setTitle(text.charAt(0).toUpperCase() + text.slice(1)); // Update title based on clicked item
  };

  const handleLogout = () => {
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
            {title} {/* Display dynamic title */}
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
          display: { xs: 'none', sm: 'block' }, // Show only on larger screens
        }}
        variant="permanent" // Always visible on large screens
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
                backgroundColor: currentComponent === text ? 'orange' : 'transparent', // Change color when clicked
                '&:hover': { backgroundColor: 'orange', cursor: 'pointer' },
              }}
            >
              <ListItemIcon>
                {text === 'orders' ? <OrdersIcon /> : text === 'addMenu' ? <AddMenuIcon /> : text === 'role' ? <RoleIcon /> : <UserIcon />}
              </ListItemIcon>
              <ListItemText primary={text.charAt(0).toUpperCase() + text.slice(1)} />
            </ListItem>
          ))}
        </List>
        <hr style={{ margin: '20px 0', borderColor: '#FF6600' }} /> {/* Horizontal line */}
        <List>
          <ListItem button onClick={logout} sx={{ '&:hover': {cursor: 'pointer'  } }}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: 'red'}} /> {/* Set icon color */}
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: 'red' }} /> {/* Set text color */}
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
          display: { xs: 'block', sm: 'none' }, // Show only on smaller screens
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
                backgroundColor: currentComponent === text ? 'orange' : 'transparent', // Change color when clicked
                '&:hover': { backgroundColor: 'orange', cursor: 'pointer' },
              }}
            >
              <ListItemIcon>
                {text === 'orders' ? <OrdersIcon /> : text === 'addMenu' ? <AddMenuIcon /> : text === 'role' ? <RoleIcon /> : <UserIcon />}
              </ListItemIcon>
              <ListItemText primary={text.charAt(0).toUpperCase() + text.slice(1)} />
            </ListItem>
          ))}
        </List>
        <hr style={{ margin: '20px 0', borderColor: '#FF6600' }} /> {/* Horizontal line */}
        <List>
          <ListItem
            button
            onClick={logout}sx={{
              '&:hover': { cursor: 'pointer' }, // Change cursor to pointer on hover
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
          overflowY: 'auto', // Push content to the right when drawer is visible
        }}
      >
        {renderComponent()}
      </Box>
    </Box>
  );
};

export default Dashboard;
