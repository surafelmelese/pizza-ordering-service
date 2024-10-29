// src/components/Navbar.js
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Pizza App
        </Typography>

        <Button component={Link} href="/" color="inherit">Home</Button>

        {user ? (
          <>
            {user.role === 'admin' && <Button component={Link} href="/admin/users" color="inherit">Manage Users</Button>}
            <Button component={Link} href="/order" color="inherit">Order</Button>
            <Button onClick={logout} color="inherit">Logout</Button>
          </>
        ) : (
          <>
            <Button component={Link} href="/login" color="inherit">Login</Button>
            <Button component={Link} href="/register" color="inherit">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
