const Student = require("../models/Student");
const Task = require("../models/Task");

/**
 * Admin Controller
 * Handles admin-specific operations for user management
 * All routes using this controller must be protected with auth middleware
 * and authorized with admin role
 */

/**
 * @route   GET /api/admin/users
 * @desc    Get all users (admin only)
 * @access  Private (Admin)
 */
exports.getAllUsers = async (req, res) => {
    try {
        // Get query parameters for filtering and pagination
        const { status, role, search, page = 1, limit = 10 } = req.query;

        // Build query object
        const query = {};

        // Add filters if provided
        if (status) query.status = status;
        if (role) query.role = role;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ];
        }

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Find users with pagination
        const users = await Student.find(query)
            .select("-password") // Exclude password
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count for pagination
        const total = await Student.countDocuments(query);

        // Get user statistics
        const totalUsers = await Student.countDocuments();
        const activeUsers = await Student.countDocuments({ status: "active" });
        const disabledUsers = await Student.countDocuments({ status: "disabled" });
        const adminCount = await Student.countDocuments({ role: "admin" });
        const userCount = await Student.countDocuments({ role: "user" });

        res.status(200).json({
            success: true,
            count: users.length,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            },
            statistics: {
                total: totalUsers,
                active: activeUsers,
                disabled: disabledUsers,
                admins: adminCount,
                users: userCount
            },
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @route   GET /api/admin/users/:id
 * @desc    Get single user by ID (admin only)
 * @access  Private (Admin)
 */
exports.getUser = async (req, res) => {
    try {
        const user = await Student.findById(req.params.id).select("-password");

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Get user's task statistics
        const taskStats = await Task.aggregate([
            { $match: { student: user._id } },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Format task statistics
        const taskStatistics = {
            total: 0,
            pending: 0,
            inProgress: 0,
            completed: 0
        };

        taskStats.forEach(stat => {
            taskStatistics.total += stat.count;
            if (stat._id === "pending") taskStatistics.pending = stat.count;
            if (stat._id === "in-progress") taskStatistics.inProgress = stat.count;
            if (stat._id === "completed") taskStatistics.completed = stat.count;
        });

        res.status(200).json({
            success: true,
            user,
            taskStatistics
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @route   PUT /api/admin/users/:id/status
 * @desc    Enable or disable a user (admin only)
 * @access  Private (Admin)
 */
exports.toggleUserStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Validate status
        if (!status || !["active", "disabled"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status. Must be 'active' or 'disabled'"
            });
        }

        const user = await Student.findById(req.params.id);

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Prevent admin from disabling themselves
        if (user._id.toString() === req.user.id && status === "disabled") {
            return res.status(400).json({
                success: false,
                message: "You cannot disable your own account"
            });
        }

        // Update user status
        user.status = status;
        await user.save();

        res.status(200).json({
            success: true,
            message: `User ${status === "active" ? "enabled" : "disabled"} successfully`,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @route   PUT /api/admin/users/:id/role
 * @desc    Update user role (admin only)
 * @access  Private (Admin)
 */
exports.updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;

        // Validate role
        if (!role || !["admin", "user"].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role. Must be 'admin' or 'user'"
            });
        }

        const user = await Student.findById(req.params.id);

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Prevent admin from removing their own admin role
        if (user._id.toString() === req.user.id && role === "user") {
            return res.status(400).json({
                success: false,
                message: "You cannot remove your own admin role"
            });
        }

        // Update user role
        user.role = role;
        await user.save();

        res.status(200).json({
            success: true,
            message: `User role updated to ${role} successfully`,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Delete a user (admin only)
 * @access  Private (Admin)
 */
exports.deleteUser = async (req, res) => {
    try {
        const user = await Student.findById(req.params.id);

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Prevent admin from deleting themselves
        if (user._id.toString() === req.user.id) {
            return res.status(400).json({
                success: false,
                message: "You cannot delete your own account"
            });
        }

        // Delete all tasks associated with the user
        await Task.deleteMany({ student: user._id });

        // Delete the user
        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "User and all associated tasks deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @route   GET /api/admin/dashboard
 * @desc    Get admin dashboard statistics
 * @access  Private (Admin)
 */
exports.getDashboardStats = async (req, res) => {
    try {
        // User statistics
        const totalUsers = await Student.countDocuments();
        const activeUsers = await Student.countDocuments({ status: "active" });
        const disabledUsers = await Student.countDocuments({ status: "disabled" });
        const adminCount = await Student.countDocuments({ role: "admin" });

        // Task statistics across all users
        const totalTasks = await Task.countDocuments();
        const completedTasks = await Task.countDocuments({ status: "completed" });
        const pendingTasks = await Task.countDocuments({ status: "pending" });
        const inProgressTasks = await Task.countDocuments({ status: "in-progress" });

        // Recent users (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentUsers = await Student.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        // Recent tasks (last 7 days)
        const recentTasks = await Task.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        res.status(200).json({
            success: true,
            statistics: {
                users: {
                    total: totalUsers,
                    active: activeUsers,
                    disabled: disabledUsers,
                    admins: adminCount,
                    recent: recentUsers
                },
                tasks: {
                    total: totalTasks,
                    completed: completedTasks,
                    pending: pendingTasks,
                    inProgress: inProgressTasks,
                    recent: recentTasks,
                    completionRate: totalTasks > 0 
                        ? Math.round((completedTasks / totalTasks) * 100) 
                        : 0
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
