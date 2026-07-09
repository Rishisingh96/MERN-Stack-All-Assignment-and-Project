const Task = require("../models/Task");

/**
 * Task Controller
 * Handles all CRUD operations for tasks
 * All routes using this controller must be protected with auth middleware
 */

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 * @access  Private (Student)
 */
exports.createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;

        // Validation
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Task title is required"
            });
        }

        // Create task with student reference from authenticated user
        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            student: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks for the logged-in student
 * @access  Private (Student)
 */
exports.getTasks = async (req, res) => {
    try {
        // Get query parameters for filtering
        const { status, priority } = req.query;

        // Build query object
        const query = { student: req.user.id };

        // Add filters if provided
        if (status) query.status = status;
        if (priority) query.priority = priority;

        // Find all tasks for the student
        const tasks = await Task.find(query)
            .sort({ createdAt: -1 }); // Newest first

        // Get task statistics
        const totalTasks = await Task.countDocuments({ student: req.user.id });
        const completedTasks = await Task.countDocuments({ 
            student: req.user.id, 
            status: "completed" 
        });
        const pendingTasks = await Task.countDocuments({ 
            student: req.user.id, 
            status: "pending" 
        });
        const inProgressTasks = await Task.countDocuments({ 
            student: req.user.id, 
            status: "in-progress" 
        });

        res.status(200).json({
            success: true,
            count: tasks.length,
            statistics: {
                total: totalTasks,
                completed: completedTasks,
                pending: pendingTasks,
                inProgress: inProgressTasks
            },
            tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @route   GET /api/tasks/:id
 * @desc    Get a single task by ID
 * @access  Private (Student)
 */
exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        // Check if task exists
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // Check if task belongs to the logged-in student
        if (task.student.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to access this task"
            });
        }

        res.status(200).json({
            success: true,
            task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update a task
 * @access  Private (Student)
 */
exports.updateTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        let task = await Task.findById(req.params.id);

        // Check if task exists
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // Check if task belongs to the logged-in student
        if (task.student.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to update this task"
            });
        }

        // Build update object
        const updateData = {};
        if (title) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (status) updateData.status = status;
        if (priority) updateData.priority = priority;
        if (dueDate !== undefined) updateData.dueDate = dueDate;

        // If status is being changed to completed, set completedAt timestamp
        if (status === "completed" && task.status !== "completed") {
            updateData.completedAt = new Date();
        }

        // Update task
        task = await Task.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task
 * @access  Private (Student)
 */
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        // Check if task exists
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // Check if task belongs to the logged-in student
        if (task.student.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this task"
            });
        }

        // Delete task
        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @route   GET /api/tasks/stats/overview
 * @desc    Get task statistics for dashboard
 * @access  Private (Student)
 */
exports.getTaskStats = async (req, res) => {
    try {
        const totalTasks = await Task.countDocuments({ student: req.user.id });
        const completedTasks = await Task.countDocuments({ 
            student: req.user.id, 
            status: "completed" 
        });
        const pendingTasks = await Task.countDocuments({ 
            student: req.user.id, 
            status: "pending" 
        });
        const inProgressTasks = await Task.countDocuments({ 
            student: req.user.id, 
            status: "in-progress" 
        });

        // Get overdue tasks
        const overdueTasks = await Task.countDocuments({
            student: req.user.id,
            dueDate: { $lt: new Date() },
            status: { $ne: "completed" }
        });

        // Get high priority tasks
        const highPriorityTasks = await Task.countDocuments({
            student: req.user.id,
            priority: "high",
            status: { $ne: "completed" }
        });

        res.status(200).json({
            success: true,
            statistics: {
                total: totalTasks,
                completed: completedTasks,
                pending: pendingTasks,
                inProgress: inProgressTasks,
                overdue: overdueTasks,
                highPriority: highPriorityTasks,
                completionRate: totalTasks > 0 
                    ? Math.round((completedTasks / totalTasks) * 100) 
                    : 0
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
