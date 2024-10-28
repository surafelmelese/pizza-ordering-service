import dbClient from '../config/db.js';
import { register, createProfile } from './user.service.js';

export const addRestaurantWithAdmin = async (data) => {
    try {
        await dbClient.query('BEGIN'); // Start a transaction

        // Check if email already exists
        const emailTaken = await emailExists(data.email);
        if (emailTaken) {
            throw new Error('Email already in use. Please choose another one.'); // Handle email duplication error
        }

        // Prepare data for super admin registration
        const adminData = {
            email: data.email,
            password: data.password,
            full_name: data.full_name,
            phone_number: data.phone_number,
            role: 'Super Admin', // Set the role
            userId: null // Placeholder for user ID
        };

        // Register the super admin
        const userResult = await register({ email: adminData.email, password: adminData.password });
        
        // Set userId for the profile
        adminData.userId = userResult.userId; // Assuming userId is returned

        // Create the profile for the super admin
        await createProfile(adminData);

        // Insert restaurant after creating the admin
        const restaurantQuery = `INSERT INTO restaurants(name, location, super_admin_id) VALUES ($1, $2, $3) RETURNING id`;
        const restaurantValues = [data.restaurant_name, data.location, adminData.userId]; // Link admin to restaurant
        const restaurantResult = await dbClient.query(restaurantQuery, restaurantValues);

        // Extract restaurant ID
        const restaurantId = restaurantResult.rows[0].id;

        // Check if the role already exists for the restaurant
        const roleName = adminData.role; // Use the role defined earlier
        const roleCheckQuery = `SELECT id FROM roles WHERE restaurant_id = $1 AND name = $2`;
        const roleCheckResult = await dbClient.query(roleCheckQuery, [restaurantId, roleName]);

        let roleId;
        
        if (roleCheckResult.rows.length === 0) {
            // Role does not exist, so insert a new role
            const insertRoleQuery = `INSERT INTO roles (restaurant_id, name) VALUES ($1, $2) RETURNING id`;
            const insertRoleValues = [restaurantId, roleName];
            const insertRoleResult = await dbClient.query(insertRoleQuery, insertRoleValues);
            roleId = insertRoleResult.rows[0].id; // Get the new role ID
        } else {
            // Role exists, use the existing role ID
            roleId = roleCheckResult.rows[0].id;
        }

        // Insert into user_roles to assign the role to the user in the restaurant
        const assignRoleQuery = `INSERT INTO user_roles (restaurant_id, user_id, role_id) VALUES ($1, $2, $3)`;
        const assignRoleValues = [restaurantId, adminData.userId, roleId];
        await dbClient.query(assignRoleQuery, assignRoleValues);

        // Commit the transaction
        await dbClient.query('COMMIT');

        return { restaurantId, superAdminId: adminData.userId };
    } catch (error) {
        await dbClient.query('ROLLBACK'); // Rollback on error
        throw error; // Propagate other errors
    }
};

// Check if email exists
export const emailExists = async (email) => {
    const result = await dbClient.query(
        `SELECT COUNT(*) FROM users WHERE email = $1`,
        [email]
    );
    return result.rows[0].count > 0; // Return true if the email exists
};