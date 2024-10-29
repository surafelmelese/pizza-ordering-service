import React, { useState } from 'react';
import { Box, Drawer, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { LocalPizza as PizzaIcon, ListAlt as OrdersIcon, Add as AddMenuIcon, Group as RoleIcon, Person as UserIcon } from '@mui/icons-material';
import Orders from './Orders'; // Import the Orders component
import AddMenu from './AddMenu'; // Import AddMenu component
import Role from './Role'; // Import Role component
import User from './User'; // Import User component

const drawerWidth = 240;

const Dashboard = () => {
  const [currentComponent, setCurrentComponent] = useState('orders'); // Track the selected component

  // Function to render components based on the selected option
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
        return <Orders />; // Default component
    }
  };

  return (
    <Box sx={{ display: 'flex', maxWidth: '100vw', overflow: 'hidden' }}>
      {/* Sidebar Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ padding: 2, textAlign: 'center' }}>
          <Typography variant="h4">PIZZA</Typography>
          <PizzaIcon sx={{ fontSize: 50 }} />
        </Box>
        <List>
          {/* Sidebar links */}
          <ListItem button onClick={() => setCurrentComponent('orders')}>
            <ListItemIcon>
              <OrdersIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button onClick={() => setCurrentComponent('addMenu')}>
            <ListItemIcon>
              <AddMenuIcon />
            </ListItemIcon>
            <ListItemText primary="Add Menu" />
          </ListItem>
          <ListItem button onClick={() => setCurrentComponent('role')}>
            <ListItemIcon>
              <RoleIcon />
            </ListItemIcon>
            <ListItemText primary="Role" />
          </ListItem>
          <ListItem button onClick={() => setCurrentComponent('user')}>
            <ListItemIcon>
              <UserIcon />
            </ListItemIcon>
            <ListItemText primary="User" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`, // Fill the remaining space
          overflowY: 'auto', // Allow vertical scrolling if content overflows
          maxWidth: 'calc(100vw - ${drawerWidth}px)', // Ensure it does not exceed screen width
        }}
      >
        {/* Conditionally render components */}
        {renderComponent()}
      </Box>
    </Box>
  );
};

export default Dashboard;
