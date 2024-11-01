import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import PizzaIcon from '@mui/icons-material/LocalPizza';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <AppBar position="static" sx={{ backgroundColor: 'orange' }}>
      <Toolbar>
        <PizzaIcon sx={{ marginRight: 1 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Pizza App
        </Typography>
        <Button component={Link} href="/" color="inherit">Home</Button>
        <Button component={Link} href="/cart" color="inherit">
          <Badge badgeContent={cartItemCount > 0 ? cartItemCount : null} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </Button>
        {user ? (
          <>
            {user.role === 'admin' && <Button component={Link} href="/admin/users" color="inherit">Manage Users</Button>}
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
