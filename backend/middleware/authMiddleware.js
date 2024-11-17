const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const protect = async (req, res, next) => {
    let token;

    // Check for Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to request
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else if (req.header('Authorization')) {
        try {
            // For tokens passed without "Bearer" prefix
            token = req.header('Authorization');

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach decoded user ID directly to the request
            req.user = { id: decoded.id }; // Adjust as needed
            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};

module.exports = { protect };
