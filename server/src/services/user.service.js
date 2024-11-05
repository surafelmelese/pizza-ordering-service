import dbClient from '../config/db.js';


export const register = async (data) => {
    try {
        const result = await dbClient.query(
            `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id`,
            [data.email, data.password]
        );
        return { userId: result.rows[0].user_id };
    } catch (err) {
        throw err;
    }
};


export const createProfile = async (data) => {
    const query = `INSERT INTO profile (user_id, full_name, phone_number) VALUES ($1, $2, $3) RETURNING *`;
    const values = [data.userId, data.full_name, data.phone_number];

    try {
        const result = await dbClient.query(query, values);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

export const assignUserRole = async (userId, roleId, restaurantId) => {
    const query = `INSERT INTO user_roles (restaurant_id, user_id, role_id) VALUES ($1, $2, $3) RETURNING *`;
    const values = [restaurantId, userId, roleId];

    try {
        const result = await dbClient.query(query, values);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

export const userById = async (id) => {
    const query = `SELECT users.user_id, users.email, profile.full_name, profile.phone_number 
                   FROM users 
                   LEFT JOIN profile ON users.user_id = profile.user_id
                   WHERE users.user_id = $1`;
    const values = [id];

    try {
        const result = await dbClient.query(query, values);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

export const getUserByEmail = async (email) => {
    const query = `
        SELECT 
            users.user_id, 
            users.email, 
            users.password, 
            profile.full_name, 
            profile.phone_number, 
            user_roles.restaurant_id, 
            user_roles.role_id,
            roles.name
        FROM users
        LEFT JOIN profile ON users.user_id = profile.user_id
        LEFT JOIN user_roles ON users.user_id = user_roles.user_id
        LEFT JOIN roles ON user_roles.role_id = roles.id
        WHERE users.email = $1
    `;
    const values = [email];

    try {
        const result = await dbClient.query(query, values);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};



export const getAllUsers = async (restaurant_id) => {
    const query = `
        SELECT 
            users.user_id, 
            users.email, 
            profile.full_name, 
            profile.phone_number, 
            roles.name 
        FROM users 
        LEFT JOIN profile ON users.user_id = profile.user_id
        LEFT JOIN user_roles ON users.user_id = user_roles.user_id
        LEFT JOIN roles ON user_roles.role_id = roles.id
        WHERE user_roles.restaurant_id = $1
    `;

    try {
        const result = await dbClient.query(query, [restaurant_id]);
        return result.rows;
    } catch (err) {
        throw err;
    }
};


export const updateProfile = async (userId, data) => {
    const query = `UPDATE profile SET full_name = $1, phone_number = $2 WHERE user_id = $3 RETURNING *`;
    const values = [data.full_name, data.phone_number, userId];

    try {
        console.log('Updating profile for userId:', userId);
        console.log('Data to update:', data);
        
        const result = await dbClient.query(query, values);
        
        console.log('Database query result:', result);
        
        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            return null;
        }
    } catch (err) {
        console.error('Error updating profile:', err);
        throw err;
    }
};


export const updateUserPassword = async (userId, newPassword) => {
    const query = `UPDATE users SET password = $1 WHERE user_id = $2 RETURNING *`;
    const values = [newPassword, userId];

    try {
        const result = await dbClient.query(query, values);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

export const deleteUser = async (userId) => {
    const query = `DELETE FROM users WHERE user_id = $1 RETURNING *`;
    const values = [userId];

    try {
        const result = await dbClient.query(query, values);
        return result.rows[0]; 
    } catch (err) {
        throw err; 
    }
};

export const deleteProfile = async (userId) => {
    const query = `DELETE FROM profile WHERE user_id = $1 RETURNING *`;
    const values = [userId];

    try {
        const result = await dbClient.query(query, values);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};
