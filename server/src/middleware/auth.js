import jwt from "jsonwebtoken";
import 'dotenv/config';

export const auth = (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "No authentication token, authorization denied." });
        }

        // Extract the token from the 'Bearer <token>' format
        const token = authHeader.split(" ")[1];

        // Verify the token using the secret from the .env file
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(401).json({ msg: "Token verification failed, authorization denied." });
        }

        // Attach user info to the request object
        req.user_id = verified.user_id;
        req.restaurant_id = verified.restaurant_id;
        req.role_id = verified.role_id;
        console.log("User ID:", req.user_id, "Restaurant ID:", req.restaurant_id, "Role ID:", req.role_id);

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error("Error in authentication middleware:", err);
        res.status(500).json({ error: err.message });
    }
};