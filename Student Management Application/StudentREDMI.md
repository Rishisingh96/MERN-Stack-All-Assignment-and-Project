# Student Management System - Complete Implementation Guide (Student.js Related)

## 📋 Table of Contents
1. [Project Setup](#project-setup)
2. [Server Creation](#server-creation)
3. [Database Connection](#database-connection)
4. [Student Model Creation](#student-model-creation)
5. [JWT Token Generation](#jwt-token-generation)
6. [Authentication Middleware](#authentication-middleware)
7. [Auth Controller](#auth-controller)
8. [Auth Routes](#auth-routes)
9. [App Configuration](#app-configuration)
10. [Environment Variables](#environment-variables)

---

## 🚀 Project Setup

### Step 1: Initialize Project
```bash
npm init -y
```

### Step 2: Install Dependencies
```bash
npm install express mongoose dotenv bcryptjs jsonwebtoken cookie-parser cors
```

### Step 3: Project Structure
```
backend/
├── server.js
├── .env
├── src/
│   ├── app.js
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── Student.js
│   ├── routes/
│   │   └── authRouter.js
│   └── utils/
│       └── generateToken.js
```

---

## 🖥️ Server Creation

### File: `server.js`
**Purpose:** Entry point of the application, starts the server and connects to database.

```javascript
const dotenv = require("dotenv");
const connectDB = require("./src/config/database");
const app = require("./src/app");

dotenv.config();

const startServer = async () => {
  try {
    // 1. Connect to MongoDB Database
    await connectDB();

    // 2. Get Port from Environment Variables
    const PORT = process.env.PORT || 5000;

    // 3. Start Express Server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
```

**Explanation:**
- Loads environment variables from `.env` file
- Connects to MongoDB database before starting server
- Starts Express server on specified port (default: 5000)
- Handles errors gracefully

---

## 🗄️ Database Connection

### File: `src/config/database.js`
**Purpose:** Establishes connection with MongoDB Atlas.

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGO_DB;

    if (!mongoUri) {
      throw new Error("MongoDB URI not found. Set MONGO_URI or MONGO_DB in your .env file.");
    }

    await mongoose.connect(mongoUri, {
      // SSL options to fix connection issues
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: false,
      tlsAllowInvalidHostnames: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

**Explanation:**
- Uses Mongoose to connect to MongoDB
- Reads connection string from environment variables
- SSL/TLS options for secure connection with MongoDB Atlas
- Timeout settings for connection reliability
- Exits process if connection fails

---

## 👤 Student Model Creation

### File: `src/models/Student.js`
**Purpose:** Defines the schema and structure for Student documents in MongoDB.

```javascript
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema(
    {
        name:{
            type: String, 
            required: [true, "Name is requred"],
            trim:true,
        },

        email: {
            type: String,
            required:[true, "Email is required"],
            unique:true,
            lowercase:true,
            trim:true,
        },
        password: {
            type: String, 
            required:[true, "Password is required"],
            minlength:6, 
            select:false,  // Password won't be returned in queries by default
        },
        role: { 
            type: String, 
            enum:['admin', 'user'],
            default:"user",
        },
        status:{
            type: String,
            enum: ["active", "disabled"],
            default:"active",
        },
    },
    {
        timestamps: true,  // Automatically adds createdAt and updatedAt
    }
);

// Hash password before saving
studentSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
studentSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
};

module.exports = mongoose.model("Student", studentSchema)
```

**Explanation:**

### Schema Fields:
- **name:** Student's name (required, trimmed)
- **email:** Unique email address (required, lowercase, trimmed)
- **password:** Hashed password (min 6 chars, hidden by default)
- **role:** User role ('admin' or 'user', default: 'user')
- **status:** Account status ('active' or 'disabled', default: 'active')
- **timestamps:** Auto-adds createdAt and updatedAt

### Pre-save Hook:
- Runs before saving a document
- Hashes password using bcrypt if it's modified
- Uses salt rounds of 10 for security

### Instance Method:
- `comparePassword()`: Compares entered password with hashed password
- Returns true if passwords match, false otherwise

---

## 🔐 JWT Token Generation

### File: `src/utils/generateToken.js`
**Purpose:** Generates JWT token for authentication.

```javascript
const jwt = require("jsonwebtoken");

const generateToken = (user) =>{
    const token = jwt.sign(
        {
            id:user._id,
            role:user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"  // Token expires in 1 day
        }
    );
    return token;
}

module.exports = generateToken;
```

**Explanation:**
- Creates JWT token with user's ID and role
- Signs token using JWT_SECRET from environment
- Token expires after 1 day
- Returns the signed token

---

## 🛡️ Authentication Middleware

### File: `src/middleware/auth.js`
**Purpose:** Protects routes by verifying JWT tokens and authorizing users.

```javascript
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

/**
 * Authentication Middleware
 * This middleware protects routes by verifying JWT token from cookies
 */
exports.protect = async (req, res, next) => {
    try {
        // 1. Get token from cookie
        const token = req.cookies.token;

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
            id: user._id,
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
```

**Explanation:**

### protect Middleware:
1. Extracts token from HTTP-only cookie
2. Verifies token exists
3. Decodes and verifies JWT token
4. Finds user in database
5. Checks if user account is active
6. Attaches user info to `req.user`
7. Handles JWT errors (expired, invalid)

### authorize Middleware:
- Checks if user's role is in allowed roles
- Used for role-based access control (e.g., admin-only routes)

---


Bhai, **ye authentication ka sabse important concept hai**. Agar ye samajh gaya, to JWT, Protected Routes aur Role-Based Authentication sab clear ho jayega.

Sabse pehle ek question.

## 🤔 Login ke baad JWT ban gaya.

```text
User Login

↓

Email Password Verify

↓

JWT Generate

↓

Cookie me Store
```

Ab socho...

User next request bhejta hai.

```http
GET /api/auth/me
```

Server ko kaise pata chalega ki ye **Rishi** hai?

JWT to browser me pada hai.

Usko **har protected request me verify kaun karega?**

👉 **Answer: Middleware**

---

# Without Middleware

Maan lo tumhare paas 20 APIs hain.

```text
GET /profile

GET /tasks

POST /tasks

DELETE /tasks

GET /admin/users

PUT /user

DELETE /user

...
```

Har controller me tumhe ye likhna padega

```javascript
const token = req.cookies.token;

if(!token){

....

}

const decoded = jwt.verify(...)

const user = await Student.findById(...)

...
```

Har file me.

```text
Controller 1

↓

Same Code

Controller 2

↓

Same Code

Controller 3

↓

Same Code
```

Ye bahut bad practice hai.

---

# Solution

Express ne Middleware diya.

Middleware matlab

> **Controller chalne se pehle jo code execute hota hai.**

Flow

```text
Request

↓

Middleware

↓

Controller

↓

Response
```

---

# Example

User

```http
GET /api/auth/me
```

Express

```text
Request

↓

protect()

↓

getMe()

↓

Response
```

Controller tak jane se pehle

```javascript
protect()
```

chal gaya.

---

# Middleware Real Flow

```text
Browser

↓

GET /profile

↓

Auth Middleware

↓

JWT Verify

↓

User Find

↓

Attach req.user

↓

Profile Controller

↓

Response
```

---

# Ab auth.js dekho

```javascript
exports.protect = async (req,res,next)=>{
```

Ye middleware hai.

Ye **route aur controller ke beech me** execute hota hai.

---

# Step 1

```javascript
const token = req.cookies.token;
```

Browser automatically cookie bhejta hai.

Example

```text
Cookie

token=eyJhbGc......
```

Middleware usko read karta hai.

---

# Step 2

```javascript
if(!token){
```

Agar token hi nahi hai

matlab

Login hi nahi hua.

Return

```text
401 Unauthorized
```

Controller tak nahi jayega.

---

# Step 3

```javascript
const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
);
```

Ye sabse important line hai.

Login ke time

```javascript
jwt.sign()
```

hua tha.

Ab

```javascript
jwt.verify()
```

ho raha hai.

Flow

```text
Login

↓

jwt.sign()

↓

Token

↓

Request

↓

jwt.verify()

↓

Original Data
```

---

Suppose token me tha

```javascript
{
    id:"123",

    role:"admin"
}
```

verify ke baad

```javascript
decoded
```

ban jayega

```javascript
{
    id:"123",

    role:"admin"
}
```

---

# Step 4

```javascript
const user =
await Student.findById(decoded.id);
```

JWT me sirf

```text
id
```

tha.

Ab database se

poora user nikal rahe hain.

```text
MongoDB

↓

Name

↓

Email

↓

Role

↓

Status
```

---

# Step 5

```javascript
if(user.status=="disabled")
```

Suppose

Admin ne account disable kar diya.

JWT to abhi bhi browser me hai.

Agar ye check nahi karoge

Disabled user bhi login rahega.

Isliye har request me

status check hota hai.

---

# Step 6

```javascript
req.user = {

id:user._id,

name:user.name,

role:user.role

}
```

Ye bahut important concept hai.

Middleware

```text
Database

↓

User

↓

req.user
```

Controller me

ab dubara database hit nahi karna padega.

Controller simply

```javascript
console.log(req.user);
```

Output

```javascript
{

id:"687....",

name:"Rishi",

email:"rishi@gmail.com",

role:"admin"

}
```

---

# Step 7

```javascript
next();
```

Express me

```javascript
next();
```

ka matlab

> "Middleware complete ho gaya, ab controller chalao."

Flow

```text
Request

↓

Middleware

↓

next()

↓

Controller

↓

Response
```

---

# Ab Route dekho

```javascript
router.get(
"/me",

protect,

getMe
);
```

Execution order

```text
Client

↓

GET /me

↓

protect()

↓

JWT Verify

↓

req.user

↓

next()

↓

getMe()

↓

Response
```

Notice

Controller se pehle

Middleware.

---

# getMe Controller

```javascript
exports.getMe = async(req,res)=>{
```

Ab

```javascript
req.user
```

already available hai.

Isliye

```javascript
const user =
await Student.findById(req.user.id);
```

Easy ho gaya.

---

# Why Middleware?

Without Middleware

```text
Profile Controller

↓

JWT Verify

↓

Find User

↓

Status Check

↓

Controller Logic
```

Task Controller

↓

Same Code

Admin Controller

↓

Same Code

Dashboard

↓

Same Code

20 baar.

---

With Middleware

```text
JWT Verify

↓

One Place

↓

Reusable
```

Har Route

```javascript
router.get(
"/profile",

protect,

profile
);

router.get(
"/tasks",

protect,

tasks
);

router.get(
"/dashboard",

protect,

dashboard
);

router.get(
"/me",

protect,

getMe
);
```

Sab routes automatically secure ho gaye.

---

# Complete Authentication Flow

```text
User Login
        │
        ▼
Email + Password
        │
        ▼
Compare Password
        │
        ▼
JWT Generate
        │
        ▼
Store Token in Cookie
        │
        ▼
──────────────────────────────
Next Request
──────────────────────────────
        │
        ▼
Browser Sends Cookie
        │
        ▼
Auth Middleware
        │
        ▼
Read Cookie
        │
        ▼
Verify JWT
        │
        ▼
Find User
        │
        ▼
Check Status
        │
        ▼
Attach req.user
        │
        ▼
next()
        │
        ▼
Controller
        │
        ▼
Response
```

## ⭐ Interview Answer

**Q. Why do we use Authentication Middleware after generating a JWT?**

**Answer:**

After login, the server generates a JWT and stores it in the client's cookie. For every future protected request, the server must verify that the token is valid, not expired, and belongs to an active user. Instead of writing the same verification code in every controller, we create an **authentication middleware**. This middleware:

1. Reads the JWT from the cookie.
2. Verifies the token using `jwt.verify()`.
3. Fetches the user from the database.
4. Checks if the account is still active.
5. Attaches the user information to `req.user`.
6. Calls `next()` so the protected controller can execute.

This keeps the code reusable, clean, and secure. It also follows the DRY (Don't Repeat Yourself) principle used in production Express applications.

---

---

## 🎮 Auth Controller

### File: `src/controllers/authController.js`
**Purpose:** Handles authentication logic (register, login, logout, get user).

```javascript
const Student = require("../models/Student");
const generateToken = require("../utils/generateToken");

// Register Controller
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
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

        // Create new user (password will be hashed by pre-save hook)
        const user = await Student.create({
            name,
            email,
            password
        });

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

// Login Controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check Empty Fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Find User (explicitly select password)
        const user = await Student.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        // Compare Password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        // Check User Status
        if (user.status === "disabled") {
            return res.status(403).json({
                success: false,
                message: "Your account has been disabled"
            });
        }

        // Generate JWT Token
        const token = generateToken(user);

        // Store Token in HTTP-only Cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000  // 1 day
        });

        // Success Response
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

// Logout Controller
exports.logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        res.status(200).json({
            success: true,
            message: "Logout Successful"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Current User (Protected Route)
exports.getMe = async (req, res) => {
    try {
        // req.user is set by auth middleware
        const user = await Student.findById(req.user.id);

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
```

**Explanation:**

### register:
- Validates input fields
- Checks if email already exists
- Creates new user (password auto-hashed)
- Returns created user

### login:
- Validates email and password
- Finds user with password
- Compares password using bcrypt
- Checks account status
- Generates JWT token
- Sets token in HTTP-only cookie
- Returns success with token

### logout:
- Clears token cookie
- Returns success message

### getMe:
- Gets current user from middleware
- Fetches full user details
- Returns user data

---

## 🛣️ Auth Routes

### File: `src/routes/authRouter.js`
**Purpose:** Defines authentication endpoints and connects them to controllers.

```javascript
const express = require("express");
const { protect } = require("../middleware/auth");

const router = express.Router();

const { register, login, logout, getMe } = require("../controllers/authController");

/**
 * Authentication Routes
 * Base path: /api/auth
 */

// Public routes (no authentication required)
router.post("/register", register);
router.post("/login", login);

// Protected routes (require authentication)
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

module.exports = router;
```

**Explanation:**

### Public Routes:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Protected Routes:
- `POST /api/auth/logout` - Logout user (requires auth)
- `GET /api/auth/me` - Get current user (requires auth)

---

## ⚙️ App Configuration

### File: `src/app.js`
**Purpose:** Main Express application setup with middleware and routes.

```javascript
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());  // Parse JSON request bodies
app.use(cookieParser());  // Parse cookies
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true  // Allow cookies in CORS
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
        });
    });
});

module.exports = app;
```

**Explanation:**
- Sets up Express application
- Configures middleware (JSON parser, cookie parser, CORS)
- Mounts route modules
- Provides API documentation at root endpoint

---

## 🔑 Environment Variables

### File: `.env`
**Purpose:** Stores sensitive configuration data.

```env
PORT=4000
MONGO_URI=mongodb+srv://rishicoding9838:Rishi9838@cluster0.oesnqz0.mongodb.net/studentmanagement?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=mySuperSecretKey123
```

**Explanation:**
- **PORT:** Server port number
- **MONGO_URI:** MongoDB Atlas connection string
- **JWT_SECRET:** Secret key for signing JWT tokens (should be complex in production)

---

## 🔄 Complete Flow Diagram

### Registration Flow:
```
User sends POST /api/auth/register
    ↓
authController.register()
    ↓
Validate input
    ↓
Check if email exists
    ↓
Student.create() → Pre-save hook hashes password
    ↓
Save to MongoDB
    ↓
Return success response
```

### Login Flow:
```
User sends POST /api/auth/login
    ↓
authController.login()
    ↓
Validate input
    ↓
Find user with password
    ↓
Compare password using bcrypt
    ↓
Check user status
    ↓
Generate JWT token
    ↓
Set token in HTTP-only cookie
    ↓
Return success with token
```

### Protected Route Flow:
```
User sends request to protected route
    ↓
auth.protect middleware
    ↓
Extract token from cookie
    ↓
Verify JWT token
    ↓
Find user in database
    ↓
Check user status
    ↓
Attach user to req.user
    ↓
Proceed to controller
```

---

## 📝 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/me` | Get current user | Yes |

---

## 🎯 Key Features of Student Model

1. **Password Security:** Automatic hashing with bcrypt before saving
2. **Password Comparison:** Built-in method to verify passwords
3. **Role-Based Access:** Admin and user roles
4. **Account Status:** Active/disabled functionality
5. **Unique Email:** Prevents duplicate registrations
6. **Timestamps:** Automatic createdAt and updatedAt
7. **Hidden Password:** Password not returned in queries by default

---

## 🔒 Security Features

1. **Bcrypt Hashing:** Passwords hashed with salt rounds
2. **JWT Authentication:** Token-based authentication
3. **HTTP-only Cookies:** Tokens stored in secure cookies
4. **CORS Configuration:** Cross-origin resource sharing setup
5. **Input Validation:** Required fields and data types
6. **Status Check:** Disabled accounts cannot login
7. **Token Expiration:** Tokens expire after 1 day

---

## 🚀 Running the Application

```bash
# Install dependencies
npm install

# Start server
npm start

# Server runs on http://localhost:4000
```

---

## 📚 Dependencies Used

- **express:** Web framework
- **mongoose:** MongoDB ODM
- **bcryptjs:** Password hashing
- **jsonwebtoken:** JWT token generation
- **cookie-parser:** Cookie parsing
- **cors:** Cross-origin resource sharing
- **dotenv:** Environment variable management

---

## ✅ Summary

This complete implementation covers:
1. ✅ Server setup with Express
2. ✅ MongoDB connection with Mongoose
3. ✅ Student model with authentication features
4. ✅ JWT token generation
5. ✅ Authentication middleware
6. ✅ Auth controllers (register, login, logout, getMe)
7. ✅ Auth routes with protection
8. ✅ App configuration with middleware
9. ✅ Environment variables setup

All components work together to create a secure authentication system for the Student Management Application.
