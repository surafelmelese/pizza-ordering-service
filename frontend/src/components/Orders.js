import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  InputLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { getAllToppings } from '../api/toppingApi';
import { getAllOrders, createOrder, updateOrder, deleteOrder } from '../api/orderApi';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderData, setOrderData] = useState({
    pizza_id: '',
    quantity: '',
    phone_number: '',
    toppings: [],
    status: orders.status || 'Preparing', // Default status
  });

  // Date formatting function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
          console.log("Loaded orders from local storage:", JSON.parse(storedOrders));
        } else {
          const response = await getAllOrders();
          setOrders(response.data);
          localStorage.setItem('orders', JSON.stringify(response.data));
        }
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };

    const fetchToppings = async () => {
      try {
        const response = await getAllToppings();
        setToppings(response.data);
      } catch (error) {
        console.error('Error fetching toppings', error);
      }
    };

    fetchOrders();
    fetchToppings();
  }, []);

  const handleDialogOpen = (order = null) => {
    setSelectedOrder(order);
    if (order) {
      setOrderData({
        pizza_id: order.pizza_id,
        quantity: order.quantity,
        phone_number: order.phone_number,
        toppings: order.toppings,
        status: order.status || 'Preparing', // Ensure status is set correctly
      });
    } else {
      setOrderData({ pizza_id: '', quantity: '', phone_number: '', toppings: [], status: 'Preparing' });
    }
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleToppingChange = (toppingId) => {
    setOrderData((prev) => ({
      ...prev,
      toppings: prev.toppings.includes(toppingId)
        ? prev.toppings.filter((id) => id !== toppingId)
        : [...prev.toppings, toppingId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedOrder) {
        await updateOrder(selectedOrder.id, orderData);
      } else {
        await createOrder(orderData);
      }
      const response = await getAllOrders();
      setOrders(response.data);
      localStorage.setItem('orders', JSON.stringify(response.data));
      handleDialogClose();
    } catch (error) {
      console.error('Error saving order', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      const response = await getAllOrders();
      setOrders(response.data);
      localStorage.setItem('orders', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error deleting order', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrder(id, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
      const response = await getAllOrders();
      setOrders(response.data);
      localStorage.setItem('orders', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  const columns = [
    { accessorKey: 'pizza_id', header: 'Pizza Name' },
    {
      accessorKey: 'toppings',
      header: 'Toppings',
      Cell: ({ row }) => (
        <Button variant="outlined" onClick={() => handleDialogOpen(row.original)}>Toppings</Button>
      ),
    },
    { accessorKey: 'quantity', header: 'Quantity' },
    { accessorKey: 'phone_number', header: 'Customer Number' },
    {
      accessorKey: 'created_at',
      header: 'Created At',
      Cell: ({ cell }) => formatDate(cell.getValue()),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      Cell: ({ row }) => (
          <FormControl>
            <Select
              name="status"
              value={orderData.status}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="Preparing">Preparing</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Ready">Ready</MenuItem>
            </Select>
          </FormControl>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <Box>
          <Button onClick={() => handleDialogOpen(row.original)}>Edit</Button>
          <Button color="error" onClick={() => handleDelete(row.original.id)}>Delete</Button>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Button variant="contained" onClick={() => handleDialogOpen()}>Add Order</Button>
      <Box style={{ overflow: 'hidden', width: '100%' }}>
        <MaterialReactTable columns={columns} data={orders} />
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <Typography variant="h5" gutterBottom>
          Package
        </Typography>
        <DialogTitle>{selectedOrder ? 'Edit Order' : 'Add Order'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Pizza ID"
            name="pizza_id"
            value={orderData.pizza_id}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={orderData.quantity}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phone_number"
            value={orderData.phone_number}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Typography variant="subtitle1">Toppings</Typography>
          <List>
            {toppings.map((topping) => (
              <ListItem key={topping.id} button onClick={() => handleToppingChange(topping.id)}>
                <FormControlLabel
                  control={<Checkbox checked={orderData.toppings.includes(topping.id)} />}
                  label={topping.name}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="subtitle1">Status</Typography>
          <FormControl fullWidth margin="normal">
            <Select
              name="status"
              value={orderData.status}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="Preparing">Preparing</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Ready">Ready</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{selectedOrder ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Orders;
