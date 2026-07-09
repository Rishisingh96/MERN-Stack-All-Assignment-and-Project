# Student Management Application - API Testing Guide

## Base URL
```
http://localhost:5000
```

## Authentication Setup
- **Token Type**: JWT (JSON Web Token)
- **Token Storage**: HTTP-only Cookie
- **Token Name**: `token`
- **Token Expiry**: 24 hours

## ⚠️ IMPORTANT: Cookie-Based Authentication
This API uses **HTTP-only cookies** for authentication, NOT Authorization headers. The token is automatically sent with requests when:
- You're using the same browser/session that logged in
- You're using Postman with cookie management enabled
- Cookies are stored and sent automatically

**To test without authentication (verify security):**
- Clear your browser cookies for localhost
- In Postman: Click "Cookies" (next to Send button) → Delete the token cookie
- Use incognito/private browser window
- Use curl without cookie file

## How to Use This Guide
1. Start with **Authentication APIs** to register and login
2. After login, the token is stored in a cookie automatically
3. Test **Task APIs** for student operations (cookie sent automatically)
4. Test **Admin APIs** for admin operations (requires admin role)
5. To verify authentication is working: clear cookies and try accessing protected routes (should get 401 error)

---

## 1. AUTHENTICATION APIS

### 1.1 Register New User
**Endpoint**: `POST /api/auth/register`  
**Authentication**: Not Required  
**Description**: Register a new student account

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201)**:
```json
{
  "success": true,
  "message": "User Registered Successfully",
  "user": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400)**:
```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

### 1.2 Login
**Endpoint**: `POST /api/auth/login`  
**Authentication**: Not Required  
**Description**: Login with email and password

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Login Successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401)**:
```json
{
  "success": false,
  "message": "Invalid Email or Password"
}
```

**Error Response (403)**:
```json
{
  "success": false,
  "message": "Your account has been disabled"
}
```

---

### 1.3 Logout
**Endpoint**: `POST /api/auth/logout`  
**Authentication**: Required (Token via Cookie)  
**Description**: Logout and clear token cookie

**Note**: The token is automatically sent via cookie from your browser/Postman session. No manual header needed.

**Response (200)**:
```json
{
  "success": true,
  "message": "Logout Successful"
}
```

---

# Required (Token via Cookie) iska matlab via Cookies - 

Haan bhai, **ye bilkul sahi approach hai**. Production me bhi bahut saare applications **JWT ko HttpOnly Cookie** me hi store karte hain. Ye actually security ke hisaab se recommended approach hai.

## Tumhare flow me kya ho raha hai?

### Login

Client request bhejta hai:

```http
POST /api/auth/login
```

Server verify karta hai aur JWT generate karta hai:

```js
const token = generateToken(user);
```

Fir server response ke saath cookie bhejta hai:

```js
res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
});
```

Browser/Postman is cookie ko save kar leta hai.

---

### Logout

Jab user request bhejta hai:

```http
POST /api/auth/logout
```

Browser ya Postman **automatically** cookie attach kar deta hai.

Actual HTTP request kuch is tarah hoti hai:

```http
POST /api/auth/logout HTTP/1.1
Host: localhost:4000

Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Isliye tumhe manually Authorization header lagane ki zarurat nahi padti.

Middleware yehi read karta hai:

```js
const token = req.cookies.token;
```

---

## Production me bhi aisa hi hota hai?

### ✔️ Haan, agar authentication cookies se implement kiya gaya ho.

Bahut saari websites (banking apps, dashboards, SaaS products) session ya JWT ko **HttpOnly cookies** me store karti hain.

Cookie options production me generally aise hote hain:

```js
res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000
});
```

* **httpOnly** → JavaScript cookie ko read nahi kar sakta (XSS protection).
* **secure** → Cookie sirf HTTPS par bheji jayegi.
* **sameSite** → CSRF attacks se protection.

---

## Do common authentication methods

### 1. Cookie Based Authentication (Tumhara project)

```
Login
   ↓
Server sets Cookie
   ↓
Browser stores Cookie
   ↓
Har request me browser automatically Cookie bhejta hai
```

Middleware:

```js
const token = req.cookies.token;
```

---

### 2. Bearer Token Authentication

```
Login
   ↓
Server returns token
   ↓
Frontend localStorage/sessionStorage me save karta hai
   ↓
Har request me manually bhejta hai
```

Header:

```http
Authorization: Bearer eyJhbGc...
```

Middleware:

```js
const token = req.headers.authorization?.split(" ")[1];
```

---

## Tumhari README ki line bhi sahi hai

```md
### Authentication
Required (Token via Cookie)

Note: The token is automatically sent via cookie from your browser/Postman session. No manual header needed.
```

Ye clearly batata hai ki project **cookie-based authentication** use karta hai.

---

## Ek chhota suggestion

README me thoda aur professional likh sakte ho:

```md
### Authentication
Required (JWT stored in HttpOnly Cookie)

**Note:** After a successful login, the server stores the JWT in an HttpOnly cookie. Browsers and Postman automatically include this cookie in subsequent requests, so you do not need to manually send an Authorization header.
```

Ye wording interview aur GitHub dono ke liye zyada professional lagegi.

**Interview me agar koi poochhe "Authorization header kyun nahi bhej rahe?"** to tum confidently bol sakte ho:

> "This project uses **cookie-based JWT authentication**. The server stores the JWT in an **HttpOnly cookie**, and the browser automatically sends it with each request. The middleware reads the token from `req.cookies.token`, so no manual `Authorization: Bearer` header is required."

---

### 1.4 Get Current User
**Endpoint**: `GET /api/auth/me`  
**Authentication**: Required (Token via Cookie)  
**Description**: Get current logged-in user details

**Note**: The token is automatically sent via cookie from your browser/Postman session. No manual header needed.

**Error Response (401) - When no token in cookie**:
```json
{
  "success": false,
  "message": "Not authorized to access this route. Please login."
}
```

**Response (200)**:
```json
{
  "success": true,
  "user": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## 2. TASK APIS

### 2.1 Create Task
**Endpoint**: `POST /api/tasks`  
**Authentication**: Required (Token via Cookie)  
**Description**: Create a new task for the logged-in student

**Note**: The token is automatically sent via cookie from your browser/Postman session. No manual header needed.

**Request Body**:
```json
{
  "title": "Complete Mathematics Assignment",
  "description": "Solve problems from Chapter 5",
  "priority": "high",
  "dueDate": "2024-02-20T18:00:00.000Z"
}
```

**Response (201)**:
```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
    "title": "Complete Mathematics Assignment",
    "description": "Solve problems from Chapter 5",
    "priority": "high",
    "status": "pending",
    "dueDate": "2024-02-20T18:00:00.000Z",
    "student": "64f1a2b3c4d5e6f7a8b9c0d1",
    "createdAt": "2024-01-15T10:35:00.000Z"
  }
}
```

**Error Response (400)**:
```json
{
  "success": false,
  "message": "Task title is required"
}
```

---

### 2.2 Get All Tasks
**Endpoint**: `GET /api/tasks`  
**Authentication**: Required (Token via Cookie)  
**Description**: Get all tasks for the logged-in student with optional filters

**Note**: The token is automatically sent via cookie from your browser/Postman session. No manual header needed.

**Query Parameters** (Optional):
- `status`: Filter by status (pending, in-progress, completed)
- `priority`: Filter by priority (low, medium, high)

**Example**: `GET /api/tasks?status=pending&priority=high`

**Response (200)**:
```json
{
  "success": true,
  "count": 2,
  "statistics": {
    "total": 5,
    "completed": 2,
    "pending": 2,
    "inProgress": 1
  },
  "tasks": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
      "title": "Complete Mathematics Assignment",
      "description": "Solve problems from Chapter 5",
      "priority": "high",
      "status": "pending",
      "dueDate": "2024-02-20T18:00:00.000Z",
      "createdAt": "2024-01-15T10:35:00.000Z"
    },
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d3",
      "title": "Physics Lab Report",
      "description": "Write lab report for experiment 3",
      "priority": "medium",
      "status": "pending",
      "dueDate": "2024-02-25T18:00:00.000Z",
      "createdAt": "2024-01-15T10:40:00.000Z"
    }
  ]
}
```

---

### 2.3 Get Single Task
**Endpoint**: `GET /api/tasks/:id`  
**Authentication**: Required (Token via Cookie)  
**Description**: Get a specific task by ID

**Note**: The token is automatically sent via cookie from your browser/Postman session. No manual header needed.

**Example**: `GET /api/tasks/64f1a2b3c4d5e6f7a8b9c0d2`

**Response (200)**:
```json
{
  "success": true,
  "task": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
    "title": "Complete Mathematics Assignment",
    "description": "Solve problems from Chapter 5",
    "priority": "high",
    "status": "pending",
    "dueDate": "2024-02-20T18:00:00.000Z",
    "student": "64f1a2b3c4d5e6f7a8b9c0d1",
    "createdAt": "2024-01-15T10:35:00.000Z"
  }
}
```

**Error Response (404)**:
```json
{
  "success": false,
  "message": "Task not found"
}
```

**Error Response (403)**:
```json
{
  "success": false,
  "message": "Not authorized to access this task"
}
```

---

### 2.4 Update Task
**Endpoint**: `PUT /api/tasks/:id`  
**Authentication**: Required (Token via Cookie)  
**Description**: Update an existing task

**Note**: The token is automatically sent via cookie from your browser/Postman session. No manual header needed.

**Example**: `PUT /api/tasks/64f1a2b3c4d5e6f7a8b9c0d2`

**Request Body** (All fields optional):
```json
{
  "title": "Complete Mathematics Assignment - Updated",
  "description": "Solve problems from Chapter 5 and 6",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2024-02-22T18:00:00.000Z"
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Task updated successfully",
  "task": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
    "title": "Complete Mathematics Assignment - Updated",
    "description": "Solve problems from Chapter 5 and 6",
    "priority": "high",
    "status": "in-progress",
    "dueDate": "2024-02-22T18:00:00.000Z",
    "student": "64f1a2b3c4d5e6f7a8b9c0d1",
    "createdAt": "2024-01-15T10:35:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

**Error Response (404)**:
```json
{
  "success": false,
  "message": "Task not found"
}
```

---

### 2.5 Delete Task
**Endpoint**: `DELETE /api/tasks/:id`  
**Authentication**: Required (Token via Cookie)  
**Description**: Delete a task

**Note**: The token is automatically sent via cookie from your browser/Postman session. No manual header needed.

**Example**: `DELETE /api/tasks/64f1a2b3c4d5e6f7a8b9c0d2`

**Response (200)**:
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Error Response (404)**:
```json
{
  "success": false,
  "message": "Task not found"
}
```

---

### 2.6 Get Task Statistics
**Endpoint**: `GET /api/tasks/stats/overview`  
**Authentication**: Required (Token via Cookie)  
**Description**: Get task statistics for dashboard

**Note**: The token is automatically sent via cookie from your browser/Postman session. No manual header needed.

**Response (200)**:
```json
{
  "success": true,
  "statistics": {
    "total": 10,
    "completed": 5,
    "pending": 3,
    "inProgress": 2,
    "overdue": 1,
    "highPriority": 2,
    "completionRate": 50
  }
}
```

---

## 3. ADMIN APIS

**Note**: All admin APIs require:
- Authentication token (via cookie)
- Admin role (user must have `role: "admin"`)

### 3.1 Get Dashboard Statistics
**Endpoint**: `GET /api/admin/dashboard`  
**Authentication**: Required (Token via Cookie + Admin Role)  
**Description**: Get overall dashboard statistics

**Note**: The token is automatically sent via cookie from your browser/Postman session. No manual header needed.

**Response (200)**:
```json
{
  "success": true,
  "statistics": {
    "users": {
      "total": 25,
      "active": 23,
      "disabled": 2,
      "admins": 3,
      "recent": 5
    },
    "tasks": {
      "total": 150,
      "completed": 80,
      "pending": 40,
      "inProgress": 30,
      "recent": 20,
      "completionRate": 53
    }
  }
}
```

---

### 3.2 Get All Users
**Endpoint**: `GET /api/admin/users`  
**Authentication**: Required (Token via Cookie + Admin Role)  
**Description**: Get all users with pagination and filters

**Note**: The token is automatically sent via cookie from your browser/Postman session. No manual header needed.

**Query Parameters** (Optional):
- `status`: Filter by status (active, disabled)
- `role`: Filter by role (admin, user)
- `search`: Search by name or email
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Example**: `GET /api/admin/users?status=active&role=user&page=1&limit=10`

**Response (200)**:
```json
{
  "success": true,
  "count": 10,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  },
  "statistics": {
    "total": 25,
    "active": 23,
    "disabled": 2,
    "admins": 3,
    "users": 22
  },
  "users": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d4",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "user",
      "status": "active",
      "createdAt": "2024-01-14T15:20:00.000Z"
    }
  ]
}
```

---

### 3.3 Get Single User
**Endpoint**: `GET /api/admin/users/:id`  
**Authentication**: Required (Token via Cookie + Admin Role)  
**Description**: Get a specific user by ID with task statistics

**Note**: The token is automatically sent via cookie from your browser/Postman session. No manual header needed.

**Example**: `GET /api/admin/users/64f1a2b3c4d5e6f7a8b9c0d1`

**Response (200)**:
```json
{
  "success": true,
  "user": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "taskStatistics": {
    "total": 10,
    "pending": 3,
    "inProgress": 2,
    "completed": 5
  }
}
```

**Error Response (404)**:
```json
{
  "success": false,
  "message": "User not found"
}
```

---

### 3.4 Toggle User Status
**Endpoint**: `PUT /api/admin/users/:id/status`  
**Authentication**: Required (Token via Cookie + Admin Role)  
**Description**: Enable or disable a user account

**Note**: The token is automatically sent via cookie from your browser/Postman session. No manual header needed.

**Example**: `PUT /api/admin/users/64f1a2b3c4d5e6f7a8b9c0d1/status`

**Request Body**:
```json
{
  "status": "disabled"
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "User disabled successfully",
  "user": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "disabled",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400)**:
```json
{
  "success": false,
  "message": "Invalid status. Must be 'active' or 'disabled'"
}
```

**Error Response (400)**:
```json
{
  "success": false,
  "message": "You cannot disable your own account"
}
```

---

### 3.5 Update User Role
**Endpoint**: `PUT /api/admin/users/:id/role`  
**Authentication**: Required (Token via Cookie + Admin Role)  
**Description**: Update a user's role (admin or user)

**Note**: The token is automatically sent via cookie from your browser/Postman session. No manual header needed.

**Example**: `PUT /api/admin/users/64f1a2b3c4d5e6f7a8b9c0d1/role`

**Request Body**:
```json
{
  "role": "admin"
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "User role updated to admin successfully",
  "user": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400)**:
```json
{
  "success": false,
  "message": "Invalid role. Must be 'admin' or 'user'"
}
```

**Error Response (400)**:
```json
{
  "success": false,
  "message": "You cannot remove your own admin role"
}
```

---

### 3.6 Delete User
**Endpoint**: `DELETE /api/admin/users/:id`  
**Authentication**: Required (Token via Cookie + Admin Role)  
**Description**: Delete a user and all associated tasks

**Note**: The token is automatically sent via cookie from your browser/Postman session. No manual header needed.

**Example**: `DELETE /api/admin/users/64f1a2b3c4d5e6f7a8b9c0d1`

**Response (200)**:
```json
{
  "success": true,
  "message": "User and all associated tasks deleted successfully"
}
```

**Error Response (404)**:
```json
{
  "success": false,
  "message": "User not found"
}
```

**Error Response (400)**:
```json
{
  "success": false,
  "message": "You cannot delete your own account"
}
```

---

## TESTING WITH POSTMAN

### Setup Instructions:
1. Create a new Collection named "Student Management API"
2. Add a variable `baseUrl` with value `http://localhost:5000`
3. Add a variable `token` (leave empty initially)

### Testing Flow:

#### Step 1: Register a User
- Method: POST
- URL: `{{baseUrl}}/api/auth/register`
- Body (raw JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123"
}
```

#### Step 2: Login
- Method: POST
- URL: `{{baseUrl}}/api/auth/login`
- Body (raw JSON):
```json
{
  "email": "test@example.com",
  "password": "test123"
}
```
- **Important**: Copy the `token` from response and set it in Postman variables

#### Step 3: Test Task APIs
Use the token in Cookie header for all task requests:
- Header: `Cookie: token={{token}}`

#### Step 4: Test Admin APIs
First, you need to promote a user to admin role (you may need to do this directly in MongoDB or have an initial admin account):
- Method: PUT
- URL: `{{baseUrl}}/api/admin/users/:id/role`
- Body: `{"role": "admin"}`
- Then login as admin and test all admin endpoints

---

## TESTING WITH CURL

### Register:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}' \
  -c cookies.txt
```

### Create Task (using cookie):
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title":"Test Task","description":"Test description","priority":"high","dueDate":"2024-02-20T18:00:00.000Z"}'
```

### Get All Tasks:
```bash
curl -X GET http://localhost:5000/api/tasks \
  -b cookies.txt
```

### Get Task Statistics:
```bash
curl -X GET http://localhost:5000/api/tasks/stats/overview \
  -b cookies.txt
```

---

## DATA MODELS

### Student Model:
```json
{
  "_id": "ObjectId",
  "name": "String (required)",
  "email": "String (required, unique)",
  "password": "String (required, hashed)",
  "role": "String (enum: 'user', 'admin', default: 'user')",
  "status": "String (enum: 'active', 'disabled', default: 'active')",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Task Model:
```json
{
  "_id": "ObjectId",
  "title": "String (required)",
  "description": "String",
  "priority": "String (enum: 'low', 'medium', 'high')",
  "status": "String (enum: 'pending', 'in-progress', 'completed', default: 'pending')",
  "dueDate": "Date",
  "student": "ObjectId (ref: Student)",
  "completedAt": "Date",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## COMMON ERROR RESPONSES

### 400 Bad Request:
```json
{
  "success": false,
  "message": "Error message describing validation failure"
}
```

### 401 Unauthorized:
```json
{
  "success": false,
  "message": "Invalid Email or Password"
}
```

### 403 Forbidden:
```json
{
  "success": false,
  "message": "Not authorized to access this resource"
}
```

### 404 Not Found:
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error:
```json
{
  "success": false,
  "message": "Server error message"
}
```

---

## NOTES

1. **Token Storage**: The API uses HTTP-only cookies for token storage. The token is automatically sent with requests when using the same cookie jar.

2. **Password Security**: Passwords are hashed before storage. Never send plain text passwords in production.

3. **Role-Based Access**: Admin APIs require both authentication and admin role authorization.

4. **Task Ownership**: Students can only access, modify, or delete their own tasks.

5. **Admin Restrictions**: Admins cannot disable, delete, or remove admin role from their own account.

6. **Date Format**: Use ISO 8601 format for dates (e.g., `2024-02-20T18:00:00.000Z`)

7. **Pagination**: Admin user list supports pagination with `page` and `limit` parameters.

8. **Filtering**: Task list supports filtering by `status` and `priority` query parameters.

---

## QUICK TEST SEQUENCE

1. **Register**: `POST /api/auth/register`
2. **Login**: `POST /api/auth/login` (save token)
3. **Get Profile**: `GET /api/auth/me`
4. **Create Task**: `POST /api/tasks`
5. **Get Tasks**: `GET /api/tasks`
6. **Get Task Stats**: `GET /api/tasks/stats/overview`
7. **Update Task**: `PUT /api/tasks/:id`
8. **Delete Task**: `DELETE /api/tasks/:id`
9. **Logout**: `POST /api/auth/logout`

For admin testing, ensure you have an admin account and test all admin endpoints in sequence.
