# Student Management Application - Backend

A complete Node.js/Express backend for a Student Management System with authentication, task management, and admin features.

## 📋 Table of Contents

- [Features](#features)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Database Schema](#database-schema)
- [How It Works](#how-it-works)

---

## ✨ Features

### Student Features
- **User Registration**: Students can create accounts with name, email, and password
- **User Login**: Secure login with JWT token authentication
- **User Logout**: Clear session by removing JWT token
- **Task Management**: Full CRUD operations for daily tasks
  - Create tasks with title, description, priority, and due date
  - View all tasks in a table format
  - Update task status (pending, in-progress, completed)
  - Delete tasks
  - Filter tasks by status and priority
  - View task statistics and completion rate

### Admin Features
- **View All Users**: See all registered students with pagination
- **User Management**: 
  - Enable/disable user accounts
  - Update user roles (admin/user)
  - Delete users (and their associated tasks)
- **Dashboard Statistics**: 
  - Total users, active users, disabled users
  - Total tasks, completed tasks, pending tasks
  - Recent users and tasks (last 7 days)
  - Task completion rate

### Security Features
- **Password Hashing**: Using bcryptjs for secure password storage
- **JWT Authentication**: Token-based authentication with httpOnly cookies
- **Role-Based Access Control**: Admin-only routes protected
- **Status Check**: Disabled users cannot login
- **Input Validation**: Server-side validation for all inputs

---

## 📁 File Structure

```
backend/
├── .env                          # Environment variables
├── package.json                  # Dependencies and scripts
├── server.js                     # Entry point - starts server
├── src/
│   ├── app.js                    # Express app configuration
│   ├── config/
│   │   └── database.js           # MongoDB connection with SSL fix
│   ├── controllers/
│   │   ├── authController.js     # Auth logic (register, login, logout)
│   │   ├── taskController.js     # Task CRUD operations
│   │   └── adminController.js    # Admin user management
│   ├── middleware/
│   │   └── auth.js               # Authentication & authorization middleware
│   ├── models/
│   │   ├── Student.js            # User model with password hashing
│   │   └── Task.js               # Task model with relationships
│   ├── routes/
│   │   ├── authRouter.js         # Authentication routes
│   │   ├── taskRouter.js         # Task routes
│   │   └── adminRouter.js        # Admin routes
│   ├── service/
│   │   └── studet.service.js     # (empty - for future use)
│   └── utils/
│       └── generateToken.js      # JWT token generation utility
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Atlas or local)
- npm or yarn

### Steps

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the backend directory:
   ```env
   PORT=4000
   MONGO_DB=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/studentmanagement?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your-super-secret-jwt-key
   CLIENT_URL=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:4000`

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | 4000 |
| `MONGO_DB` | MongoDB connection string | mongodb+srv://... |
| `JWT_SECRET` | Secret key for JWT signing | mySuperSecretKey123 |
| `CLIENT_URL` | Frontend URL for CORS | http://localhost:3000 |

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/me` | Get current user | Yes |

#### Register Request
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login Request
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login Response
```json
{
  "success": true,
  "message": "Login Successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Task Routes (`/api/tasks`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all user tasks | Yes |
| GET | `/api/tasks/:id` | Get single task | Yes |
| POST | `/api/tasks` | Create new task | Yes |
| PUT | `/api/tasks/:id` | Update task | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Yes |
| GET | `/api/tasks/stats/overview` | Get task statistics | Yes |

#### Create Task Request
```json
{
  "title": "Complete Assignment",
  "description": "Finish the math assignment",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

#### Get Tasks Response
```json
{
  "success": true,
  "count": 5,
  "statistics": {
    "total": 10,
    "completed": 5,
    "pending": 3,
    "inProgress": 2
  },
  "tasks": [...]
}
```

---

### Admin Routes (`/api/admin`)

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| GET | `/api/admin/dashboard` | Get dashboard stats | Yes | Admin |
| GET | `/api/admin/users` | Get all users | Yes | Admin |
| GET | `/api/admin/users/:id` | Get single user | Yes | Admin |
| PUT | `/api/admin/users/:id/status` | Toggle user status | Yes | Admin |
| PUT | `/api/admin/users/:id/role` | Update user role | Yes | Admin |
| DELETE | `/api/admin/users/:id` | Delete user | Yes | Admin |

#### Toggle User Status Request
```json
{
  "status": "disabled"
}
```

#### Update User Role Request
```json
{
  "role": "admin"
}
```

---

## 🔐 Authentication Flow

### 1. Registration
```
User → POST /api/auth/register
     → Server validates input
     → Checks if email exists
     → Hashes password with bcrypt
     → Creates user in database
     → Returns user data (without password)
```

### 2. Login
```
User → POST /api/auth/login
     → Server validates input
     → Finds user by email
     → Compares password with bcrypt
     → Checks if user is disabled
     → Generates JWT token
     → Sets token in httpOnly cookie
     → Returns success with token
```

### 3. Protected Route Access
```
User → Request to protected route
     → Middleware extracts token from cookie
     → Verifies token with JWT_SECRET
     → Finds user from database
     → Checks user status
     → Attaches user to req object
     → Proceeds to controller
```

### 4. Logout
```
User → POST /api/auth/logout
     → Middleware verifies token
     → Clears token cookie
     → Returns success
```

---

## 🗄️ Database Schema

### Student Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed, select: false),
  role: String (enum: ['admin', 'user'], default: 'user'),
  status: String (enum: ['active', 'disabled'], default: 'active'),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model

```javascript
{
  title: String (required, max 100 chars),
  description: String (max 500 chars),
  status: String (enum: ['pending', 'in-progress', 'completed'], default: 'pending'),
  priority: String (enum: ['low', 'medium', 'high'], default: 'medium'),
  dueDate: Date,
  student: ObjectId (ref: 'Student', required),
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📚 How It Works - In-Depth Explanation

### 1. Server Setup (`server.js`)

The entry point of the application:
- Loads environment variables using `dotenv`
- Connects to MongoDB using `connectDB()`
- Starts the Express server on the configured port
- Handles connection errors gracefully

### 2. App Configuration (`app.js`)

Configures the Express application:
- **Middleware Setup**:
  - `express.json()`: Parses incoming JSON requests
  - `cookieParser()`: Parses cookies from request headers
  - `cors()`: Enables CORS for frontend communication
- **Route Mounting**: Organizes routes by feature (auth, tasks, admin)
- **Root Route**: Provides API information

### 3. Database Connection (`config/database.js`)

Connects to MongoDB with SSL configuration:
- Uses connection string from environment variables
- **SSL Options Added**: Fixes SSL connection errors
  - `ssl: true`: Enables SSL
  - `tls: true`: Uses TLS protocol
  - `serverSelectionTimeoutMS`: Timeout for server selection
  - `socketTimeoutMS`: Socket timeout configuration
- Handles connection errors and exits process on failure

### 4. Authentication System

#### Student Model (`models/Student.js`)
- **Schema Definition**: Defines user structure with validation
- **Pre-save Hook**: Automatically hashes password before saving
  ```javascript
  studentSchema.pre("save", async function () {
      if (!this.isModified("password")) return;
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
  });
  ```
- **Compare Password Method**: Instance method to verify passwords
  ```javascript
  studentSchema.methods.comparePassword = async function (enterPassword) {
      return await bcrypt.compare(enterPassword, this.password);
  };
  ```

#### Token Generation (`utils/generateToken.js`)
- Creates JWT token with user payload
- Signs token with `JWT_SECRET`
- Sets token expiration to 1 day
- Returns signed token

#### Auth Controller (`controllers/authController.js`)

**Register Function**:
1. Validates input fields (name, email, password)
2. Checks if email already exists
3. Creates user (password auto-hashed by model hook)
4. Returns success response with user data

**Login Function**:
1. Validates input fields (email, password)
2. Finds user by email (includes password field)
3. Compares password using bcrypt
4. Checks if user is disabled
5. Generates JWT token
6. Sets token in httpOnly cookie (secure from XSS)
7. Returns success with token

**Logout Function**:
1. Clears token cookie
2. Returns success response

**GetMe Function**:
1. Uses `req.user` from middleware
2. Fetches full user data from database
3. Returns user information

### 5. Middleware (`middleware/auth.js`)

#### Protect Middleware
Protects routes by verifying authentication:
1. Extracts token from cookies
2. Returns 401 if no token
3. Verifies token with JWT_SECRET
4. Finds user from database
5. Checks if user exists
6. Checks if user is disabled
7. Attaches user to `req.user`
8. Calls `next()` to proceed

#### Authorize Middleware
Checks user role authorization:
1. Accepts allowed roles as parameters
2. Checks if `req.user.role` is in allowed roles
3. Returns 403 if not authorized
4. Calls `next()` if authorized

### 6. Task Management System

#### Task Model (`models/Task.js`)
- **Schema**: Defines task structure with validation
- **Indexes**: Optimizes queries for student and status
- **Virtual Property**: `isOverdue` - checks if task is overdue
- **Relationship**: References Student model

#### Task Controller (`controllers/taskController.js`)

**Create Task**:
1. Validates title field
2. Creates task with student reference from `req.user.id`
3. Returns created task

**Get Tasks**:
1. Builds query with student reference
2. Applies filters (status, priority) if provided
3. Fetches tasks sorted by creation date
4. Calculates statistics (total, completed, pending, in-progress)
5. Returns tasks with statistics

**Get Single Task**:
1. Finds task by ID
2. Checks if task exists
3. Verifies task belongs to logged-in student
4. Returns task data

**Update Task**:
1. Finds task by ID
2. Checks if task exists
3. Verifies task belongs to logged-in student
4. Updates provided fields
5. Sets `completedAt` if status changed to completed
6. Returns updated task

**Delete Task**:
1. Finds task by ID
2. Checks if task exists
3. Verifies task belongs to logged-in student
4. Deletes task
5. Returns success message

**Get Task Stats**:
1. Counts tasks by status
2. Counts overdue tasks
3. Counts high priority tasks
4. Calculates completion rate
5. Returns statistics

### 7. Admin System

#### Admin Controller (`controllers/adminController.js`)

**Get All Users**:
1. Builds query with filters (status, role, search)
2. Implements pagination (page, limit)
3. Fetches users excluding passwords
4. Calculates user statistics
5. Returns users with pagination and statistics

**Get Single User**:
1. Finds user by ID
2. Checks if user exists
3. Aggregates task statistics for the user
4. Returns user with task statistics

**Toggle User Status**:
1. Validates status (active/disabled)
2. Finds user by ID
3. Prevents admin from disabling themselves
4. Updates user status
5. Returns updated user

**Update User Role**:
1. Validates role (admin/user)
2. Finds user by ID
3. Prevents admin from removing their own role
4. Updates user role
5. Returns updated user

**Delete User**:
1. Finds user by ID
2. Prevents admin from deleting themselves
3. Deletes all tasks associated with user
4. Deletes user
5. Returns success message

**Get Dashboard Stats**:
1. Calculates user statistics (total, active, disabled, admins)
2. Calculates task statistics (total, completed, pending, in-progress)
3. Counts recent users (last 7 days)
4. Counts recent tasks (last 7 days)
5. Calculates task completion rate
6. Returns dashboard statistics

### 8. Route Organization

#### Auth Router (`routes/authRouter.js`)
- Public routes: register, login
- Protected routes: logout, getMe
- Uses `protect` middleware for protected routes

#### Task Router (`routes/taskRouter.js`)
- All routes protected with `protect` middleware
- Organized by resource (CRUD pattern)
- Statistics route for dashboard

#### Admin Router (`routes/adminRouter.js`)
- All routes protected with `protect` middleware
- All routes authorized with `authorize('admin')` middleware
- Organized by feature (users, dashboard)

---

## 🔒 Security Features Explained

### 1. Password Hashing
- Uses bcryptjs with salt rounds of 10
- Passwords are never stored in plain text
- Hashing happens automatically before saving

### 2. JWT Token Authentication
- Tokens are signed with secret key
- Tokens expire after 1 day
- Tokens stored in httpOnly cookies (not accessible via JavaScript)
- Prevents XSS attacks

### 3. Role-Based Access Control
- Two roles: admin and user
- Admin routes protected with `authorize('admin')` middleware
- Regular users cannot access admin endpoints

### 4. User Status Check
- Disabled users cannot login
- Admin can disable/enable users
- Status checked during login and on protected routes

### 5. Input Validation
- All required fields validated
- Email uniqueness checked
- Password minimum length enforced
- Enum values validated (status, role, priority)

### 6. Ownership Verification
- Users can only access their own tasks
- Admins can access all users
- Prevents unauthorized data access

---

## 🧪 Testing the API

### Using Postman or Thunder Client

1. **Register a user**:
   - POST `http://localhost:4000/api/auth/register`
   - Body: `{ "name": "Test User", "email": "test@test.com", "password": "123456" }`

2. **Login**:
   - POST `http://localhost:4000/api/auth/login`
   - Body: `{ "email": "test@test.com", "password": "123456" }`
   - Token will be set in cookie

3. **Create a task**:
   - POST `http://localhost:4000/api/tasks`
   - Body: `{ "title": "Test Task", "priority": "high" }`
   - Cookie will be automatically sent

4. **Get tasks**:
   - GET `http://localhost:4000/api/tasks`
   - Returns all tasks for logged-in user

5. **To test admin features**:
   - First create an admin user via MongoDB Compass
   - Set role to "admin" in database
   - Use admin credentials to login
   - Access admin endpoints

---

## 🐛 Troubleshooting

### SSL Connection Error
If you encounter SSL errors:
- The database connection now includes SSL options
- Ensure your MongoDB Atlas cluster allows connections from your IP
- Check if your connection string is correct

### Token Not Working
- Ensure JWT_SECRET is set in .env
- Check if token is expired (1 day expiration)
- Verify cookie is being sent with requests

### CORS Errors
- Ensure CLIENT_URL is set correctly in .env
- Check if frontend URL matches CORS origin
- Verify credentials are enabled in CORS config

---

## 📝 Notes

- First registered user will have role "user" by default
- To create an admin user, manually update role in MongoDB Compass
- All timestamps are in UTC
- Passwords are never returned in API responses
- Tasks are automatically deleted when user is deleted

---

## 🎯 Next Steps

To complete the full-stack application:
1. Create React frontend with:
   - Login/Register pages
   - Task management dashboard
   - Admin panel
   - Task table view
2. Integrate frontend with this backend API
3. Add error handling in frontend
4. Implement loading states
5. Add form validation

---

## 📄 License

ISC

## 👤 Author

Rishi Singh
