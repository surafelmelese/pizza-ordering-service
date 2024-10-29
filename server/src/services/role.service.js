import dbClient from '../config/db.js';

// Get all roles
export const getAllRoles = async () => {
    const query = 'SELECT * FROM roles';
    try {
        const result = await dbClient.query(query);
        return result.rows; // Return the list of all roles
    } catch (err) {
        console.error('Error fetching roles:', err);
        throw new Error('Failed to fetch roles'); // Throw a descriptive error
    }
};

// Get a role by ID
export const getRoleById = async (id) => {
    const query = 'SELECT * FROM roles WHERE id = $1';
    const values = [id];
    try {
        const result = await dbClient.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Role not found'); // Add a check for role existence
        }
        return result.rows[0]; // Return the role found by ID
    } catch (err) {
        console.error('Error fetching role by ID:', err);
        throw new Error('Failed to fetch role by ID'); // Throw a descriptive error
    }
};

// Create a new role with a check if the same role exists in the same restaurant
export const createRole = async (restaurant_id, name) => {
    // First check if the role already exists in the restaurant
    const checkQuery = 'SELECT * FROM roles WHERE restaurant_id = $1 AND name = $2';
    const checkValues = [restaurant_id, name];

    try {
        const checkResult = await dbClient.query(checkQuery, checkValues);

        // If a role with the same name exists in the same restaurant, throw an error
        if (checkResult.rows.length > 0) {
            throw new Error("A role with the same name already exists in this restaurant.");
        }

        // If the role doesn't exist, proceed with creation
        const insertQuery = 'INSERT INTO roles (restaurant_id, name) VALUES ($1, $2) RETURNING *';
        const insertValues = [restaurant_id, name];
        const insertResult = await dbClient.query(insertQuery, insertValues);

        return insertResult.rows[0]; // Return the newly created role
    } catch (err) {
        console.error('Error creating role:', err);
        throw new Error('Failed to create role'); // Throw a descriptive error
    }
};

// Get role ID by name
export const getRoleByName = async (roleName) => {
    const query = 'SELECT id FROM roles WHERE name = $1'; // Remove RETURNING
    const values = [roleName];

    try {
        const result = await dbClient.query(query, values);
        if (!result) {
            throw new Error('Role not found'); // Add a check for role existence
        }
        return result.rows[0]; // Return the role found by name
    } catch (err) {
        console.error('Error fetching role by name:', err);
        throw new Error('Failed to fetch role by name'); // Throw a descriptive error
    }
};

// Update a role by ID
export const updateRole = async (id, name) => {
    const query = 'UPDATE roles SET name = $1 WHERE id = $2 RETURNING *';
    const values = [name, id];
    try {
        const result = await dbClient.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Role not found'); // Add a check for role existence
        }
        return result.rows[0]; // Return the updated role
    } catch (err) {
        console.error('Error updating role:', err);
        throw new Error('Failed to update role'); // Throw a descriptive error
    }
};

// Delete a role by ID
export const deleteRole = async (id) => {
    const query = 'DELETE FROM roles WHERE id = $1 RETURNING *';
    const values = [id];
    try {
        const result = await dbClient.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Role not found'); // Add a check for role existence
        }
        return result.rows[0]; // Return the deleted role
    } catch (err) {
        console.error('Error deleting role:', err);
        throw new Error('Failed to delete role'); // Throw a descriptive error
    }
};