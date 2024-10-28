import 'dotenv/config';
import {
    register,
    createProfile,
    assignUserRole,
    getAllUsers,
    userById,
    getUserByEmail,
    updateProfile,
    deleteUser
} from '../services/user.service.js';
import { createRole, getRoleByName } from '../services/role.service.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Create a new user
export const createUser = async (req, res) => {
    const { full_name, email, password, phone_number, role_name } = req.body;
    const restaurantId = req.restaurant_id;

    // Validate input fields
    if (!full_name || !phone_number || !email || !password) {
        return res.status(400).json({ msg: "Not all fields have been provided!" });
    }

    if (password.length < 8) {
        return res.status(400).json({ msg: 'Password must be at least 8 characters!' });
    }

    try {
        // Check if user already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ msg: "An account with this email already exists!" });
        }

        // Fetch or create the role
        let roleId = null;
        const role = await getRoleByName(role_name);

        if (!role) {
            // Role not found, create a new role
            const createdRole = await createRole(restaurantId, role_name);
            roleId = createdRole.id; // Use the newly created role ID
        } else {
            roleId = role.id; // Use existing role ID
        }

        // Hash the password
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Register the new user
        const userResult = await register({ ...req.body, password: hashedPassword });

        // Create the user profile
        await createProfile({ userId: userResult.userId, full_name, phone_number });

        // Assign role to the user
        await assignUserRole(userResult.userId, roleId, restaurantId);

        // Success response
        return res.status(201).json({ msg: "New user added successfully" });
    } catch (error) {
        console.error('Error during user creation:', error);
        return res.status(500).json({ msg: "Database connection error" });
    }
};

// Get all users
export const getUsers = async (req, res) => {
    try {
        const results = await getAllUsers();
        return res.status(200).json({ data: results });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ msg: "Database connection error" });
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    const { user_id } = req.params;
    try {
        const results = await userById(user_id);
        
        if (!results) {
            return res.status(404).json({ msg: "Record not found" });
        }

        return res.status(200).json({ data: results });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Database connection error" });
    }
};

// Update user
export const updateUserDetails = async (req, res) => {
    const { user_id } = req.params;
    const { full_name, phone_number } = req.body;

    // Validate input fields
    if (!full_name && !phone_number) {
        return res.status(400).json({ msg: "No fields to update!" });
    }

    try {
        const result = await updateProfile(user_id, { full_name, phone_number});
        
        if (!result) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({ msg: "User updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Database connection error" });
    }
};

// Delete user
export const deleteUserById = async (req, res) => {
    const { user_id } = req.params;

    try {
        const result = await deleteUser(user_id);
        
        if (!result.rowCount) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Database connection error" });
    }
};

// User login
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
        return res.status(400).json({ msg: "Both email and password are required" });
    }

    try {
        // Fetch user by email
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ msg: "No account has been registered with this email" });
        }
        // Compare passwords
        const isMatch = bcrypt.compareSync(password.trim(), user.password.trim());
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials!" });
        }

        // Generate JWT token upon successful login
        const token = jwt.sign({ user_id: user.user_id, restaurant_id: user.restaurant_id, role_id: user.role_id, role_name: user.name }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Send token and user data back to the client
        return res.json({
            token,
            user: {
                user_id: user.user_id,
                role_id: user.role_id,
                role_name: user.name,
                restaurant_id: user.restaurant_id,
                display_name: user.full_name,
            }
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ msg: "Database connection error" });
    }
};