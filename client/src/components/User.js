// src/pages/admin/users.js
import withAuth from '../utils/withAuth';
import { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../api/userApi';
import { Box, Typography, IconButton } from '@mui/material';
import {MaterialReactTable} from 'material-react-table';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Check local storage first
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
          console.log("Loaded users from local storage:", JSON.parse(storedUsers));
        } else {
          const response = await getAllUsers();
          const userData = response.data?.data;  // Adjust based on API response
          setUsers(userData);
          console.log("Fetched Users:", userData);
          // Store the fetched data in local storage
          localStorage.setItem('users', JSON.stringify(userData));
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter((user) => user.user_id !== id);
        // Update local storage
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        return updatedUsers;
      });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const columns = [
    { accessorKey: 'user_id', header: 'ID' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'full_name', header: 'Full Name' },
    { accessorKey: 'phone_number', header: 'Phone Number' },
    { accessorKey: 'name', header: 'Role' },
    {
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <Box>
          <IconButton
            color="primary"
            onClick={() => console.log(`Edit user ${row.original.user_id}`)}
            aria-label="Edit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(row.original.user_id)}
            aria-label="Delete"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Management
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={users}
        enableColumnOrdering
        enableRowSelection={false}
      />
    </Box>
  );
};

export default withAuth(UserList, ['admin', 'super admin']);
