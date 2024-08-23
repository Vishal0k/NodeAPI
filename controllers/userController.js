import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../DB/db.mjs';

const registerUser = async (req, res) => {
    try {
        const { user_name, user_password, email } = req.body;
        const saltRounds = 8;
        const hash = bcrypt.hashSync(user_password, saltRounds);

        if (!user_name || !user_password || !email) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const query = "INSERT INTO users (user_name, user_password, email) VALUES ($1, $2, $3) RETURNING *";
        const values = [user_name, hash, email];
        const result = await pool.query(query, values);

        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error caught:", error.message);
        return res.status(500).json({ error: `Internal Error: ${error.message}` });
    }
};

const loginUser = async (req, res) => {
    try {
        const { user_name, user_password } = req.body;

        const selectQuery = "SELECT user_id, user_name, user_password FROM users WHERE user_name = $1";
        const result = await pool.query(selectQuery, [user_name]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid Credentials: User Not Found' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(user_password, user.user_password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Credentials: Password Did Not Match' });
        }

        const secretKey = 'jwt-secret';  // Ensure this matches the key used in the auth middleware
        const token = jwt.sign({ user_id: user.user_id }, secretKey, { expiresIn: '5m' });

        return res.status(200).json({ token });
    } catch (error) {
        console.error("Error caught:", error.message);
        return res.status(500).json({ error: `Internal Error: ${error.message}` });
    }
};

export { registerUser, loginUser };
