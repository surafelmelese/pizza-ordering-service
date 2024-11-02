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


export const createUser = async (req, res) => {
    const { full_name, email, password, phone_number, role_name } = req.body;
    const restaurantId = req.restaurant_id;

    if (!full_name || !phone_number || !email || !password) {
        return res.status(400).json({ msg: "Not all fields have been provided!" });
    }

    if (password.length < 8) {
        return res.status(400).json({ msg: 'Password must be at least 8 characters!' });
    }

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ msg: "An account with this email already exists!" });
        }

        let roleId = null;
        const role = await getRoleByName(role_name);

        if (!role) {
            const createdRole = await createRole(restaurantId, role_name);
            roleId = createdRole.id;
        } else {
            roleId = role.id;
        }

        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, salt);

        const userResult = await register({ ...req.body, password: hashedPassword });

        await createProfile({ userId: userResult.userId, full_name, phone_number });

        await assignUserRole(userResult.userId, roleId, restaurantId);

        return res.status(201).json({ msg: "New user added successfully" });
    } catch (error) {
        console.error('Error during user creation:', error);
        return res.status(500).json({ msg: "Database connection error" });
    }
};

export const getUsers = async (req, res) => {
    try {
        const results = await getAllUsers();
        return res.status(200).json({ data: results });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ msg: "Database connection error" });
    }
};

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

export const updateUserDetails = async (req, res) => {
    const { user_id } = req.params;
    const { full_name, phone_number } = req.body;

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

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Both email and password are required" });
    }

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ msg: "No account has been registered with this email" });
        }
        const isMatch = bcrypt.compareSync(password.trim(), user.password.trim());
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials!" });
        }

        const token = jwt.sign({ user_id: user.user_id, restaurant_id: user.restaurant_id, role_id: user.role_id, role_name: user.name }, process.env.JWT_SECRET, { expiresIn: "1h" });

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