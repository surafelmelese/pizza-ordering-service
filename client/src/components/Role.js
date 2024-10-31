import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton, 
} from '@mui/material';
import { getAllRoles, createRole, updateRole, deleteRole } from '../api/roleApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'; 
import GenericTable from './GenericTable';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [roleData, setRoleData] = useState({ 
    name: '',
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const storedRoles = localStorage.getItem('roles');
        if (storedRoles) {
          setRoles(JSON.parse(storedRoles));
        } else {
          const response = await getAllRoles();
          setRoles(response.data.data);
          localStorage.setItem('roles', JSON.stringify(response.data.data));
        }
      } catch (error) {
        console.error('Error fetching roles', error);
      }
    };

    fetchRoles();
  }, []);

  const handleDialogOpen = (role = null) => {
    setSelectedRole(role);
    if (role) {
      setRoleData({ name: role.name });
    } else {
      setRoleData({ name: '' });
    }
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedRole(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleData({ ...roleData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedRole) {
        await updateRole(selectedRole.id, roleData);
      } else {
        await createRole(roleData); 
      }
      const response = await getAllRoles();
      setRoles(response.data.data);
      localStorage.setItem('roles', JSON.stringify(response.data.data));
      handleDialogClose();
    } catch (error) {
      console.error('Error saving role', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRole(id);
      const response = await getAllRoles();
      setRoles(response.data.data);
      localStorage.setItem('roles', JSON.stringify(response.data.data));
    } catch (error) {
      console.error('Error deleting role', error);
    }
  };

  const columns = [
    { accessorKey: 'name', header: 'Role Name' },
    {
      accessorKey: 'created_at',
      header: 'Created At',
      Cell: ({ cell }) => {
        const date = new Date(cell.getValue());
        return date.toLocaleString();
      },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <Box>
          <IconButton onClick={() => handleDialogOpen(row.original)} title="Edit">
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(row.original.id)} title="Delete">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Button variant="contained" onClick={() => handleDialogOpen()}>Add Role</Button>
      <Box style={{ overflow: 'hidden', width: '100%' }}>
        <GenericTable
          title="roles"
          columns={columns}
          data={roles}
        />
      </Box>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{selectedRole ? 'Edit Role' : 'Add Role'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            name="name"
            value={roleData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {selectedRole ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Roles;
