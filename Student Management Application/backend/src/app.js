const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Routes
const authRouter = require("./routes/authRouter");
const taskRouter = require("./routes/taskRouter");
const adminRouter = require("./routes/adminRouter");

// Mount routes
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/admin", adminRouter);

// Root route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Student Management API",
        version: "1.0.0",
        endpoints: {
            auth: "/api/auth",
            tasks: "/api/tasks",
            admin: "/api/admin"
        }
    });
});

module.exports = app;