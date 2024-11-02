import {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
} from '../services/role.service.js';

export const getRoles = async (req, res) => {
    try {
        const roles = await getAllRoles();
        return res.status(200).json({ data: roles });
    } catch (err) {
        return res.status(500).json({ msg: 'Database connection error', error: err.message });
    }
};

export const getRole = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await getRoleById(id);
        if (!role) {
            return res.status(404).json({ msg: 'Role not found' });
        }
        return res.status(200).json({ data: role });
    } catch (err) {
        return res.status(500).json({ msg: 'Database connection error', error: err.message });
    }
};

export const createNewRole = async (req, res) => {
    const { name } = req.body;
    const {user_id, restaurant_id, role_id} = req
    if (!name) {
        return res.status(400).json({ msg: 'Role name is required' });
    }
    if (!restaurant_id) {
        return res.status(400).json({ msg: 'Not authorized' });
    }

    try {
        const newRole = await createRole(restaurant_id, name);
        return res.status(201).json({ msg: 'Role created successfully', data: newRole });
    } catch (err) {
        return res.status(500).json({ msg: 'Database connection error', error: err.message });
    }
};

export const updateRoleById = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ msg: 'Role name is required' });
    }

    try {
        const updatedRole = await updateRole(id, name);
        if (!updatedRole) {
            return res.status(404).json({ msg: 'Role not found' });
        }
        return res.status(200).json({ msg: 'Role updated successfully', data: updatedRole });
    } catch (err) {
        return res.status(500).json({ msg: 'Database connection error', error: err.message });
    }
};

export const deleteRoleById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRole = await deleteRole(id);
        if (!deletedRole) {
            return res.status(404).json({ msg: 'Role not found' });
        }
        return res.status(200).json({ msg: 'Role deleted successfully', data: deletedRole });
    } catch (err) {
        return res.status(500).json({ msg: 'Database connection error', error: err.message });
    }
};