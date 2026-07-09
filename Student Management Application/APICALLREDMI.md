# API CALL DATA FLOW EXPLANATION (A-Z)

## 📋 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Frontend API Setup](#frontend-api-setup)
3. [Backend API Setup](#backend-api-setup)
4. [Complete Data Flow](#complete-data-flow)
5. [Example: Register API](#example-register-api)
6. [Example: Login API](#example-login-api)
7. [Example: Create Task API](#example-create-task-api)
8. [Authentication Flow](#authentication-flow)

---

## 🏗️ Architecture Overview

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   Frontend      │         │   Backend       │         │   Database      │
│   (React)       │◄────────┤   (Express)     │◄────────┤   (MongoDB)     │
│                 │         │                 │         │                 │
│  - Components   │         │  - Routes       │         │  - Collections  │
│  - Services     │         │  - Controllers  │         │  - Documents    │
│  - Context      │         │  - Middleware   │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

---

## 🔧 Frontend API Setup

### 1. **api.js** - Central Axios Instance
**Location:** `frontend/src/services/api.js`

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,  // Important for cookies (JWT token)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

**Key Points:**
- `baseURL`: All API calls start with this URL
- `withCredentials: true`: Enables cookies to be sent with requests (for JWT token)
- `headers`: Sets default content type to JSON

---

### 2. **authService.js** - Authentication API Calls
**Location:** `frontend/src/services/authService.js`

```javascript
import api from './api';

export const authService = {
  // Register User
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login User
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Logout User
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Get Current User
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};
```

**Key Points:**
- Each function makes an HTTP request to the backend
- `api.post()`: Sends data to backend (for login, register)
- `api.get()`: Fetches data from backend (for getMe)
- Returns `response.data` - the actual response body from backend

---

### 3. **taskService.js** - Task API Calls
**Location:** `frontend/src/services/taskService.js`

```javascript
import api from './api';

export const taskService = {
  // Get All Tasks
  getTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  // Create Task
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Update Task
  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Delete Task
  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};
```

**Key Points:**
- `api.get()`: Fetch data (GET request)
- `api.post()`: Create new data (POST request)
- `api.put()`: Update existing data (PUT request)
- `api.delete()`: Remove data (DELETE request)

---

## 🖥️ Backend API Setup

### 1. **app.js** - Express Server Setup
**Location:** `backend/src/app.js`

```javascript
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());              // Parse JSON bodies
app.use(cookieParser());              // Parse cookies
app.use(cors({
    origin: "http://localhost:5173",  // Allow frontend origin
    credentials: true                 // Allow cookies
}));

// Routes
const authRouter = require("./routes/authRouter");
const taskRouter = require("./routes/taskRouter");

// Mount routes
app.use("/api/auth", authRouter);     // All auth routes start with /api/auth
app.use("/api/tasks", taskRouter);    // All task routes start with /api/tasks
```

**Key Points:**
- `express.json()`: Parses incoming JSON request bodies
- `cookieParser()`: Parses cookies from requests
- `cors`: Enables Cross-Origin Resource Sharing
- `credentials: true`: Allows cookies to be sent/received

---

### 2. **authRouter.js** - Authentication Routes
**Location:** `backend/src/routes/authRouter.js`

```javascript
const express = require("express");
const { protect } = require("../middleware/auth");

const router = express.Router();

const { register, login, logout, getMe } = require("../controllers/authController");

// Public routes (no authentication required)
router.post("/register", register);
router.post("/login", login);

// Protected routes (require authentication)
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

module.exports = router;
```

**Key Points:**
- `router.post()`: Handles POST requests
- `router.get()`: Handles GET requests
- `protect`: Middleware that checks if user is authenticated
- Routes without `protect` are public (anyone can access)
- Routes with `protect` require valid JWT token

---

### 3. **taskRouter.js** - Task Routes
**Location:** `backend/src/routes/taskRouter.js`

```javascript
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

// All routes are protected (require authentication)
router.get("/stats/overview", protect, getTaskStats);

router.route("/")
    .get(protect, getTasks)           // GET /api/tasks
    .post(protect, createTask);       // POST /api/tasks

router.route("/:id")
    .get(protect, getTask)            // GET /api/tasks/:id
    .put(protect, updateTask)         // PUT /api/tasks/:id
    .delete(protect, deleteTask);     // DELETE /api/tasks/:id

module.exports = router;
```

**Key Points:**
- `router.route()`: Chain multiple HTTP methods for same path
- `/:id`: Dynamic route parameter (task ID)
- All task routes require authentication (`protect` middleware)

---

### 4. **authController.js** - Authentication Logic
**Location:** `backend/src/controllers/authController.js`

```javascript
const Student = require("../models/Student");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, adminKey } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await Student.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Create user in database
        const user = await Student.create({
            name, email, password, role
        });

        // Send response
        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await Student.findOne({ email }).select("+password");

        // Check password
        const isMatch = await user.comparePassword(password);

        // Generate JWT token
        const token = generateToken(user);

        // Store token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000  // 24 hours
        });

        // Send response
        res.status(200).json({
            success: true,
            message: "Login Successful",
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
```

**Key Points:**
- `req.body`: Data sent from frontend
- `req.cookies`: Cookies sent from frontend
- `res.json()`: Send JSON response to frontend
- `res.cookie()`: Set cookie in browser
- `res.status()`: Set HTTP status code

---

### 5. **taskController.js** - Task Logic
**Location:** `backend/src/controllers/taskController.js`

```javascript
const Task = require("../models/Task");

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

        // Create task with student reference
        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            student: req.user.id  // From auth middleware
        });

        // Send response
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

exports.getTasks = async (req, res) => {
    try {
        // Get tasks for logged-in student only
        const tasks = await Task.find({ student: req.user.id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
```

**Key Points:**
- `req.user.id`: User ID from JWT token (set by auth middleware)
- `Task.create()`: Create new document in MongoDB
- `Task.find()`: Query documents from MongoDB
- `req.user.id` ensures users only see their own data

---

## 🔄 Complete Data Flow

### Step-by-Step Flow:

```
1. USER ACTION (Frontend)
   └─ User clicks "Register" button
   └─ Component calls authService.register(userData)

2. API CALL (Frontend → Backend)
   └─ authService makes: api.post('/auth/register', userData)
   └─ Axios sends POST request to: http://localhost:4000/api/auth/register
   └─ Request body: { name, email, password }
   └─ Cookie (if logged in): token=jwt_token

3. ROUTE HANDLING (Backend)
   └─ Express receives request at /api/auth/register
   └─ Routes to: authRouter.js → register controller

4. CONTROLLER LOGIC (Backend)
   └─ authController.register() executes
   └─ Validates input data
   �─ Checks if user exists in database
   └─ Creates new user in MongoDB
   └─ Prepares response

5. DATABASE OPERATION (Backend → MongoDB)
   └─ Student.create({ name, email, password })
   └─ MongoDB saves new document
   └─ Returns created user object

6. RESPONSE (Backend → Frontend)
   └─ Controller sends: res.status(201).json({ success: true, user })
   └─ Express sends HTTP 201 response with JSON body

7. RESPONSE HANDLING (Frontend)
   └─ Axios receives response
   └─ authService returns: response.data
   └─ Component receives: { success: true, user }

8. UI UPDATE (Frontend)
   └─ Component updates state
   └─ React re-renders UI
   └─ User sees success message
```

---

## 📝 Example: Register API

### Frontend Component (Register.jsx)
```javascript
const handleRegister = async (e) => {
  e.preventDefault();
  
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  };

  try {
    const response = await authService.register(userData);
    console.log(response); // { success: true, user: {...} }
    // Navigate to login
  } catch (error) {
    console.error(error);
  }
};
```

### Frontend Service (authService.js)
```javascript
register: async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
},
```

### HTTP Request Sent
```
POST http://localhost:4000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Backend Route (authRouter.js)
```javascript
router.post("/register", register);
```

### Backend Controller (authController.js)
```javascript
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  
  // Check if user exists
  const existingUser = await Student.findOne({ email });
  
  // Create user
  const user = await Student.create({ name, email, password });
  
  // Send response
  res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    user
  });
};
```

### HTTP Response Received
```
HTTP 201 Created
Content-Type: application/json

{
  "success": true,
  "message": "User Registered Successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## 🔐 Example: Login API

### Frontend Component (Login.jsx)
```javascript
const handleLogin = async (e) => {
  e.preventDefault();
  
  const credentials = {
    email: 'john@example.com',
    password: 'password123'
  };

  try {
    const response = await authService.login(credentials);
    console.log(response); // { success: true, token: "jwt_token_here" }
    // Store token in cookie (automatically done by backend)
    // Navigate to dashboard
  } catch (error) {
    console.error(error);
  }
};
```

### Frontend Service (authService.js)
```javascript
login: async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
},
```

### HTTP Request Sent
```
POST http://localhost:4000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Backend Controller (authController.js)
```javascript
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  // Find user
  const user = await Student.findOne({ email }).select("+password");
  
  // Compare password
  const isMatch = await user.comparePassword(password);
  
  // Generate JWT token
  const token = generateToken(user);
  
  // Store token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  });
  
  // Send response
  res.status(200).json({
    success: true,
    message: "Login Successful",
    token
  });
};
```

### HTTP Response Received
```
HTTP 200 OK
Content-Type: application/json
Set-Cookie: token=jwt_token_here; Max-Age=86400; HttpOnly

{
  "success": true,
  "message": "Login Successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## ✅ Example: Create Task API

### Frontend Component (TaskList.jsx)
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const taskData = {
    title: 'Complete Assignment',
    description: 'Finish the MERN project',
    status: 'pending',
    priority: 'high'
  };

  try {
    const response = await taskService.createTask(taskData);
    console.log(response); // { success: true, task: {...} }
    // Refresh task list
    fetchTasks();
  } catch (error) {
    console.error(error);
  }
};
```

### Frontend Service (taskService.js)
```javascript
createTask: async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
},
```

### HTTP Request Sent
```
POST http://localhost:4000/api/tasks
Content-Type: application/json
Cookie: token=jwt_token_here

{
  "title": "Complete Assignment",
  "description": "Finish the MERN project",
  "status": "pending",
  "priority": "high"
}
```

### Backend Route (taskRouter.js)
```javascript
router.post("/", protect, createTask);
```

### Auth Middleware (auth.js)
```javascript
exports.protect = async (req, res, next) => {
  // Extract token from cookie
  const token = req.cookies.token;
  
  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  // Get user from token
  req.user = await Student.findById(decoded.id);
  
  next(); // Continue to controller
};
```

### Backend Controller (taskController.js)
```javascript
exports.createTask = async (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  
  // Create task with student reference
  const task = await Task.create({
    title,
    description,
    priority,
    dueDate,
    student: req.user.id  // From auth middleware
  });
  
  // Send response
  res.status(201).json({
    success: true,
    message: "Task created successfully",
    task
  });
};
```

### HTTP Response Received
```
HTTP 201 Created
Content-Type: application/json

{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete Assignment",
    "description": "Finish the MERN project",
    "status": "pending",
    "priority": "high",
    "student": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## 🔒 Authentication Flow

### How JWT Token Works:

1. **Login**
   - User sends email/password
   - Backend verifies credentials
   - Backend generates JWT token
   - Backend sets token in httpOnly cookie
   - Frontend receives cookie (automatically stored)

2. **Subsequent Requests**
   - Frontend makes API call
   - Axios automatically sends cookie with request
   - Backend `protect` middleware verifies token
   - Backend extracts user ID from token
   - Backend sets `req.user` with user info
   - Controller uses `req.user.id` to identify user

3. **Logout**
   - Frontend calls authService.logout()
   - Backend clears cookie
   - Token is removed from browser

### Why httpOnly Cookie?
- **Security**: JavaScript cannot access httpOnly cookies (prevents XSS attacks)
- **Automatic**: Axios automatically sends cookies with requests
- **Convenience**: No need to manually add token to headers

---

## 📊 Summary Table

| Layer | File | Purpose |
|-------|------|---------|
| **Frontend UI** | Component.jsx | User interaction, state management |
| **Frontend Service** | authService.js | Makes HTTP requests to backend |
| **Frontend API** | api.js | Axios configuration, base URL |
| **Backend Route** | authRouter.js | Maps URL to controller |
| **Backend Middleware** | auth.js | Verifies JWT token |
| **Backend Controller** | authController.js | Business logic, database operations |
| **Backend Model** | Student.js | MongoDB schema |
| **Database** | MongoDB | Stores data |

---

## 🎯 Key Takeaways

1. **Frontend → Backend**: Components call services, services make HTTP requests via Axios
2. **Backend → Frontend**: Controllers send JSON responses, Axios receives and passes to services
3. **Authentication**: JWT token stored in httpOnly cookie, sent automatically with requests
4. **Authorization**: Middleware verifies token, controller uses `req.user.id` to filter data
5. **Data Flow**: User → Component → Service → API → Route → Middleware → Controller → Database → Controller → Response → Service → Component → UI

---

## 🚀 Quick Reference

### HTTP Methods:
- **GET**: Fetch data
- **POST**: Create data
- **PUT/PATCH**: Update data
- **DELETE**: Remove data

### HTTP Status Codes:
- **200**: Success
- **201**: Created
- **400**: Bad Request (validation error)
- **401**: Unauthorized (not logged in)
- **403**: Forbidden (no permission)
- **404**: Not Found
- **500**: Server Error

### Request/Response Flow:
```
Request: Frontend → Service → API → Route → Middleware → Controller → Database
Response: Database → Controller → Response → API → Service → Frontend
```
