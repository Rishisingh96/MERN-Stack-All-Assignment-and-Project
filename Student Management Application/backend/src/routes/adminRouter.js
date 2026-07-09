const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const {
    getAllUsers,
    getUser,
    toggleUserStatus,
    updateUserRole,
    deleteUser,
    getDashboardStats
} = require("../controllers/adminController");

const router = express.Router();

/**
 * Admin Routes
 * All routes are protected with authentication and require admin role
 * Base path: /api/admin
 */

// Dashboard statistics
router.get("/dashboard", protect, authorize("admin"), getDashboardStats);

// User management routes
router.get("/users", protect, authorize("admin"), getAllUsers);
router.get("/users/:id", protect, authorize("admin"), getUser);
router.put("/users/:id/status", protect, authorize("admin"), toggleUserStatus);
router.put("/users/:id/role", protect, authorize("admin"), updateUserRole);
router.delete("/users/:id", protect, authorize("admin"), deleteUser);

module.exports = router;
