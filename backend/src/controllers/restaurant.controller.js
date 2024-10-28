import { addRestaurantWithAdmin } from '../services/restaurant.service.js'; // Ensure path and extension are correct
import { generateToken } from '../utils/jwt.js';
import bcrypt from 'bcryptjs';
import { userSchema } from '../validations/user.validation.js';

export const registerRestaurant = async (req, res) => {
  const validation = userSchema.safeParse(req.body);
  console.log(req.body);

  // Validate request body
  if (!validation.success) {
    return res.status(400).json({ errors: validation.error.errors });
  }

  try {
    // Hash the password
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    // Attempt to add restaurant with admin
    const user = await addRestaurantWithAdmin({...req.body, password: hashedPassword});
    console.log(user);

    // Generate JWT token for the user
    const token = generateToken(user);
    
    // Return successful response with user data and token
    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Error in register controller:', error.message);

    // Handle specific email duplication error
    if (error.message === 'Email already in use. Please choose another one.') {
      return res.status(400).json({ error: error.message });
    }

    // Handle other unexpected errors
    res.status(500).json({ error: 'User registration failed. Please try again later.' });
  }
};