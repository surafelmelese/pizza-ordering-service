import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
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
  OutlinedInput,
  Select,
  MenuItem,
  FormControl,
  IconButton 
} from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { getAllToppings } from '../api/toppingApi';
import { getAllOrders, createOrder, updateOrder, deleteOrder } from '../api/orderApi';
import { CSVLink } from 'react-csv';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

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
    status: 'Preparing',
  });

  const formatDate = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
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
        status: order.status || 'Preparing',
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

  const columns = [
    { accessorKey: 'pizza_id', header: 'Pizza Name' },
    {
      accessorKey: 'toppings',
      header: 'Toppings',
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'orange' }}>
          <IconButton sx={{ color: 'orange', padding: 0 }}>
            <VisibilityIcon />
          </IconButton>
          <Typography 
            variant="body2" 
            onClick={() => handleDialogOpen(row.original)} 
            sx={{ cursor: 'pointer', color: 'orange' }}
          >
            Toppings
          </Typography>
        </Box>
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
           <FormControl fullWidth>
    <Select
      name="status"
      value={orderData.status}
      onChange={handleChange}
      displayEmpty
      input={<OutlinedInput notched={false} />} // Remove outline
      sx={{
        height: '100%', // Fit to height
        '& .MuiSelect-select': {
          padding: '10px 0', // Adjust padding
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none', // Remove border
        },
      }}
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
       <Box display="flex" gap={1}>
          <IconButton onClick={() => handleDialogOpen(row.original)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(row.original.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ backgroundColor: '#f5f5f5'}}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} sx={{ backgroundColor: '#FF6600', padding: 2 }}>
          <Typography variant="h6" sx={{ color: '#fff' }}>Packages</Typography>
          <Box>
            <Button onClick={() => window.location.reload()} startIcon={<RefreshIcon />} sx={{ color: '#fff', m:0, p:0 }}/>
            <CSVLink data={orders} filename="orders.csv" style={{ textDecoration: 'none', m:0, p:0  }}>
              <Button startIcon={<DownloadIcon />} sx={{ color: '#fff', m:0, p:0 }}/>
            </CSVLink>
          </Box>
        </Box>
        <MaterialReactTable
          columns={columns}
          data={orders}
          components={{
            Toolbar: () => <CustomToolbar orders={orders} />,
          }}
          enableColumnFiltering={false}
          sx={{ backgroundColor: '#000000', '& .MuiTableCell-root': { padding: 0, margin: 0 } }}
        />
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