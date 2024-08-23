import jwt from 'jsonwebtoken';

const secretKey = 'jwt-secret';

const authenticateToken = (req, res, next) => { 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified;
        next();
    } catch(err) { 
        res.status(403).json({ message: 'Invalid Token' });
    }
};

export default authenticateToken;
