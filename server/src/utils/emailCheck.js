import dbClient from '../config/db.js';
export const emailExists = async (email) => {
    const result = await dbClient.query(
        `SELECT COUNT(*) FROM users WHERE email = $1`,
        [email]
    );
    return result.rows[0].count > 0; 
};