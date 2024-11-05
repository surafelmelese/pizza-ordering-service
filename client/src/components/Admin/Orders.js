import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  List,
  ListItem,
  OutlinedInput,
  Select,
  MenuItem,
  FormControl,
  IconButton,
} from '@mui/material';
import { getAllToppings } from '../../api/toppingApi';
import { getAllOrders, createOrder, updateOrder, deleteOrder, updateOrderStatus } from '../../api/orderApi';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import GenericTable from './GenericTable';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderData, setOrderData] = useState({
    pizza_id: '',
    pizza_name: '',
    quantity: '',
    phone_number: '',
    toppings: [],
    status: '',
  });

  const formatDate = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        setOrders(response.data);
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
        pizza_name: order.pizza_name,
        quantity: order.quantity,
        phone_number: order.phone_number,
        toppings: order.toppings,
        status: order.status || 'Preparing',
      });
    } else {
      setOrderData({ pizza_id: '', pizza_name: '', quantity: '', phone_number: '', toppings: [], status: 'Preparing' });
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

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status', error);
    }
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
    } catch (error) {
      console.error('Error deleting order', error);
    }
  };

  const getToppingNames = (toppingIds) => {
    return toppingIds
      .map((id) => toppings.find((topping) => topping.id === id)?.name || 'Unknown Topping')
      .join(', ');
  };

  const columns = [
    { accessorKey: 'pizza_name', header: 'Pizza Name' },
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
      Cell: ({ row }) => {
        const status = row.original.status;
        const backgroundColor =
          status === 'Preparing' ? 'orange' : status === 'Ready' ? 'green' : 'white';

        return (
          <Box
            sx={{
              backgroundColor: backgroundColor,
              border: 'none',
              padding: 0,
              borderRadius: 75,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              margin: 0,
              height: '100%',
            }}
          >
            {status === 'Delivered' ? (
              <>
                <CheckIcon sx={{ color: 'green', fontSize: '1rem', margin: 0 }} />
                <Typography variant="body2" sx={{ marginLeft: 0.25, padding: 0, lineHeight: '1', fontSize: '0.875rem' }}>
                  Delivered
                </Typography>
              </>
            ) : (
              <FormControl fullWidth sx={{ padding: 0, margin: 0, border: 'none' }}>
                <Select
                  value={status}
                  onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
                  displayEmpty
                  input={<OutlinedInput notched={false} sx={{ margin: 0, padding: 0, height: '100%', border: 'none' }} />}
                >
                  <MenuItem value="Preparing">Preparing</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Ready">Ready</MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
        );
      },
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
      <Box sx={{ backgroundColor: '#f5f5f5' }}>
        <GenericTable title="Orders" columns={columns} data={orders} />
      </Box>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <Paper elevation={3} sx={{ padding: 2, width: { xs: '90%', sm: '400px' }, margin: 'auto', textAlign: 'left' }}>
          <DialogTitle sx={{ textAlign: 'center' }}>Order Detail</DialogTitle>
          <DialogContent>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Name: {selectedOrder?.pizza_name || "Unknown Pizza"}
            </Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
              Toppings: {selectedOrder ? getToppingNames(selectedOrder.toppings) : "Unknown"}
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Quantity: {selectedOrder?.quantity || 0}
            </Typography>
          </DialogContent>
        </Paper>
      </Dialog>
    </Box>
  );
};

export default Orders;
