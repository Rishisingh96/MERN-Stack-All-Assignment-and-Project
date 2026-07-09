const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

/**
 * Authentication Middleware
 * This middleware protects routes by verifying JWT token from cookies
 * 
 * How it works:
 * 1. Extracts token from cookies
 * 2. Verifies token using JWT_SECRET
 * 3. Finds user from database using decoded token
 * 4. Attaches user to req object for use in controllers
 * 5. Proceeds to next middleware/controller if successful
 */
exports.protect = async (req, res, next) => {
    try {
        // 1. Get token from cookie or Authorization header
        let token;
        
        // Check for token in cookie first
        if (req.cookies.token) {
            token = req.cookies.token;
        }
        // Check for token in Authorization header (Bearer token)
        else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // 2. Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized to access this route. Please login."
            });
        }

        // 3. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Find user from database (excluding password)
        const user = await Student.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists"
            });
        }

        // 5. Check if user is disabled
        if (user.status === "disabled") {
            return res.status(403).json({
                success: false,
                message: "Your account has been disabled"
            });
        }

        // 6. Attach user to request object
        req.user = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role
        };

        next();
    } catch (error) {
        // Handle JWT errors (expired, invalid, etc.)
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please login again."
            });
        }
        
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired. Please login again."
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Authorization Middleware
 * This middleware checks if user has specific role (admin)
 * 
 * Usage: Place after protect middleware
 * Example: router.get('/admin-only', protect, authorize('admin'), adminController)
 */
exports.authorize = (...roles) => {
    return (req, res, next) => {
        // Check if user role is in allowed roles
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role '${req.user.role}' is not authorized to access this route`
            });
        }
        next();
    };
};
