import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton, // Import IconButton
} from '@mui/material';
import { MaterialReactTable } from 'material-react-table'; // Import the table library
import { getAllRoles, createRole, updateRole, deleteRole } from '../api/roleApi'; // Import API functions
import EditIcon from '@mui/icons-material/Edit'; // Import Edit icon
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete icon

const Roles = () => {
  const [roles, setRoles] = useState([]); // State for storing roles
  const [openDialog, setOpenDialog] = useState(false); // State for controlling dialog visibility
  const [selectedRole, setSelectedRole] = useState(null); // State for storing the role being edited
  const [roleData, setRoleData] = useState({ // State for handling form input
    name: '', // Role name
  });

  // Fetch all roles on component mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const storedRoles = localStorage.getItem('roles');
        if (storedRoles) {
          setRoles(JSON.parse(storedRoles));
        } else {
          const response = await getAllRoles();
          setRoles(response.data.data);
          localStorage.setItem('roles', JSON.stringify(response.data.data)); // Ensure you store the correct data
        }
      } catch (error) {
        console.error('Error fetching roles', error);
      }
    };

    fetchRoles();
  }, []);

  // Open dialog for creating/editing a role
  const handleDialogOpen = (role = null) => {
    setSelectedRole(role);
    if (role) {
      setRoleData({ name: role.name }); // Pre-fill form with selected role data
    } else {
      setRoleData({ name: '' }); // Reset form
    }
    setOpenDialog(true);
  };

  // Close the dialog
  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedRole(null);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleData({ ...roleData, [name]: value });
  };

  // Handle form submission for creating/updating a role
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedRole) {
        await updateRole(selectedRole.id, roleData); // Update existing role
      } else {
        await createRole(roleData); // Create new role
      }
      const response = await getAllRoles(); // Refresh roles after create/update
      setRoles(response.data.data); // Update the roles state
      localStorage.setItem('roles', JSON.stringify(response.data.data)); // Store the updated roles
      handleDialogClose(); // Close dialog after submission
    } catch (error) {
      console.error('Error saving role', error);
    }
  };

  // Handle role deletion
  const handleDelete = async (id) => {
    try {
      await deleteRole(id);
      const response = await getAllRoles(); // Refresh roles after deletion
      setRoles(response.data.data); // Update the roles state
      localStorage.setItem('roles', JSON.stringify(response.data.data)); // Store the updated roles
    } catch (error) {
      console.error('Error deleting role', error);
    }
  };

  // Table columns
  const columns = [
    { accessorKey: 'name', header: 'Role Name' },
    {
      accessorKey: 'created_at',
      header: 'Created At',
      Cell: ({ cell }) => {
        const date = new Date(cell.getValue());
        return date.toLocaleString(); // Format the date to a readable format
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
      {/* Material React Table with full width and no horizontal scroll */}
      <Box style={{ overflow: 'hidden', width: '100%' }}>
        <MaterialReactTable columns={columns} data={roles} />
      </Box>

      {/* Dialog for adding/editing roles */}
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
