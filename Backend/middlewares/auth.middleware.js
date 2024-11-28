import userModel from '../models/user.model.js';  // Correct import for the user model
import captainModel from '../models/captain.model.js';  // Correct import for the captain model
import jwt from 'jsonwebtoken';  // Correct JWT import
import BlacklistToken from '../models/blacklistToken.model.js';  // Correct import for blacklist token model

// Helper function to authenticate any entity (user or captain)
async function authEntity(req, res, next, model) {
    // Extract token from cookies or authorization header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if the token is blacklisted
    const isBlacklisted = await BlacklistToken.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Decode the token to get the user's or captain's ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const entity = await model.findById(decoded._id);  // Find the entity by ID

        if (!entity) {
            return res.status(401).json({ message: 'Entity not found' });
        }

        // Attach the entity (user or captain) to the request object
        req.entity = entity;
        return next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

// Middleware to authenticate user
export function authUser(req, res, next) {
    authEntity(req, res, next, userModel);  // Use the user model for user authentication
}

// Middleware to authenticate captain
export function authCaptain(req, res, next) {
    authEntity(req, res, next, captainModel);  // Use the captain model for captain authentication
}
