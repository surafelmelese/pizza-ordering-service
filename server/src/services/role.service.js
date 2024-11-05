import dbClient from '../config/db.js';

export const getAllRoles = async (restaurant_id) => {
    console.log(restaurant_id)
    const query = 'SELECT DISTINCT * FROM roles WHERE restaurant_id = $1';
    try {
        const result = await dbClient.query(query, [restaurant_id]);
        return result.rows; 
    } catch (err) {
        console.error('Error fetching roles:', err);
        throw new Error('Failed to fetch roles');
    }
};


export const getRoleById = async (id) => {
    const query = 'SELECT * FROM roles WHERE id = $1';
    const values = [id];
    try {
        const result = await dbClient.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Role not found');
        }
        return result.rows[0]; 
    } catch (err) {
        console.error('Error fetching role by ID:', err);
        throw new Error('Failed to fetch role by ID'); 
    }
};


export const createRole = async (restaurant_id, name) => {
    const checkQuery = 'SELECT * FROM roles WHERE restaurant_id = $1 AND name = $2';
    const checkValues = [restaurant_id, name];

    try {
        const checkResult = await dbClient.query(checkQuery, checkValues);

        if (checkResult.rows.length > 0) {
            throw new Error("A role with the same name already exists in this restaurant.");
        }

        const insertQuery = 'INSERT INTO roles (restaurant_id, name) VALUES ($1, $2) RETURNING *';
        const insertValues = [restaurant_id, name];
        const insertResult = await dbClient.query(insertQuery, insertValues);

        return insertResult.rows[0];
    } catch (err) {
        console.error('Error creating role:', err);
        throw new Error('Failed to create role');
    }
};

export const getRoleByName = async (roleName) => {
    const query = 'SELECT id FROM roles WHERE name = $1';
    const values = [roleName];

    try {
        const result = await dbClient.query(query, values);
        if (!result) {
            throw new Error('Role not found');
        }
        return result.rows[0];
    } catch (err) {
        console.error('Error fetching role by name:', err);
        throw new Error('Failed to fetch role by name');
    }
};

export const updateRole = async (id, name) => {
    const query = 'UPDATE roles SET name = $1 WHERE id = $2 RETURNING *';
    const values = [name, id];
    try {
        const result = await dbClient.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Role not found');
        }
        return result.rows[0];
    } catch (err) {
        console.error('Error updating role:', err);
        throw new Error('Failed to update role');
    }
};

export const deleteRole = async (id) => {
    const query = 'DELETE FROM roles WHERE id = $1 RETURNING *';
    const values = [id];
    try {
        const result = await dbClient.query(query, values);
        if (result.rows.length === 0) {
            throw new Error('Role not found');
        }
        return result.rows[0];
    } catch (err) {
        console.error('Error deleting role:', err);
        throw new Error('Failed to delete role'); 
    }
};