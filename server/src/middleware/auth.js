import jwt from "jsonwebtoken";
import 'dotenv/config';

export const auth = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "No authentication token, authorization denied." });
        }

        const token = authHeader.split(" ")[1];

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(401).json({ msg: "Token verification failed, authorization denied." });
        }

        req.user_id = verified.user_id;
        req.restaurant_id = verified.restaurant_id;
        req.role_id = verified.role_id;
        console.log("User ID:", req.user_id, "Restaurant ID:", req.restaurant_id, "Role ID:", req.role_id);

        next();
    } catch (err) {
        console.error("Error in authentication middleware:", err);
        res.status(500).json({ error: err.message });
    }
};