const express = require("express");
const { protect } = require("../middleware/auth");
const {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    getTaskStats
} = require("../controllers/taskController");

const router = express.Router();

/**
 * Task Routes
 * All routes are protected and require authentication
 * Base path: /api/tasks
 */

// Get task statistics for dashboard
router.get("/stats/overview", protect, getTaskStats);

// CRUD Routes
router.route("/")
    .get(protect, getTasks)           // Get all tasks for logged-in student
    .post(protect, createTask);       // Create new task

router.route("/:id")
    .get(protect, getTask)            // Get single task
    .put(protect, updateTask)         // Update task
    .delete(protect, deleteTask);     // Delete task

module.exports = router;
