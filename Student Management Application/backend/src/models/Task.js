const mongoose = require("mongoose");

/**
 * Task Model
 * This model represents daily tasks created by students
 * 
 * Schema Fields:
 * - title: Task title (required)
 * - description: Detailed task description
 * - status: Task status (pending, in-progress, completed)
 * - priority: Task priority (low, medium, high)
 * - dueDate: Due date for the task
 * - student: Reference to the student who created the task
 * - completedAt: Timestamp when task was completed
 */
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Task title is required"],
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters"]
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"]
        },
        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending"
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        },
        dueDate: {
            type: Date,
            default: null
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true
        },
        completedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

// Index for faster queries
taskSchema.index({ student: 1, status: 1 });
taskSchema.index({ student: 1, dueDate: 1 });

// Virtual for checking if task is overdue
taskSchema.virtual("isOverdue").get(function() {
    if (!this.dueDate || this.status === "completed") {
        return false;
    }
    return new Date(this.dueDate) < new Date();
});

// Ensure virtuals are included in JSON
taskSchema.set("toJSON", { virtuals: true });
taskSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Task", taskSchema);
