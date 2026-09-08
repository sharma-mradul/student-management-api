<p align="center">
🚀 Student Management API
</p>
<p align="center">
  <b>A production-style REST API built with Node.js, Express, MongoDB, and JWT authentication.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge&logo=mongoose&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/JWT-Authentication-black?style=flat-square&logo=jsonwebtokens" />
  <img src="https://img.shields.io/badge/Bcrypt-Password%20Security-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/REST-API-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" />
</p>

---

# 📌 Overview

**Student Management API** is a backend REST API built to manage student data while implementing real-world backend concepts such as authentication, authorization, JWT, refresh tokens, middleware, pagination, filtering, sorting, aggregation, and structured backend architecture.

This project is part of my journey to deeply understand **Node.js backend development** by building features step-by-step and learning how requests, databases, authentication, and middleware actually work together.

---

# ✨ Features

## 👨‍🎓 Student Management

- Create students
- Get all students
- Get student by ID
- Update student
- Delete student
- Filtering
- Sorting
- Pagination

---

## 🔐 Authentication

- User registration
- Secure password hashing using bcrypt
- User login
- JWT Access Tokens
- Refresh Tokens
- HTTP-only cookies
- Refresh token database storage
- Refresh token validation
- Token revocation
- Logout functionality

---

## 🛡️ Authorization

- Authentication middleware
- Protected routes
- Role-Based Access Control (RBAC)
- Reusable authorization middleware

Example:

    router.delete(
        "/:id",
        authMiddleware,
        authorize("admin"),
        deleteStudent
    );

---

# 🏗️ Request Architecture

    Client
       │
       ▼
     Routes
       │
       ▼
   Controllers
       │
       ▼
     Services
       │
       ▼
      Models
       │
       ▼
     MongoDB

The backend separates responsibilities so different parts of the application handle different jobs.

    Routes
       ↓
    Controllers
       ↓
     Services
       ↓
      Models
       ↓
     Database

---

# 📁 Project Structure

    student-management-api
    │
    ├── controllers
    │   ├── authController.js
    │   └── studentController.js
    │
    ├── middlewares
    │   ├── authMiddleware.js
    │   ├── errorMiddleware.js
    │   └── roleMiddleware.js
    │
    ├── models
    │   ├── User.js
    │   ├── Student.js
    │   └── RefreshToken.js
    │
    ├── routes
    │   ├── authRoutes.js
    │   └── studentRoutes.js
    │
    ├── services
    │
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── package.json
    ├── package-lock.json
    ├── README.md
    └── server.js

---

# 🔄 Authentication Flow

## 📝 Registration

    Client
      │
      ▼
    POST /auth/register
      │
      ▼
    Get name, email & password
      │
      ▼
    Hash password using bcrypt
      │
      ▼
    Create User document
      │
      ▼
    Save to MongoDB
      │
      ▼
    201 Created

---

# 🔑 Login Flow

    Client
      │
      ▼
    POST /auth/login
      │
      ▼
    Find user by email
      │
      ▼
    Compare password using bcrypt
      │
      ▼
    Create Access Token
      │
      ▼
    Create Refresh Token
      │
      ├─────────────────┐
      ▼                 ▼
    Store in DB     HTTP-only Cookie
      │                 │
      └────────┬────────┘
               ▼
       Send Access Token

---

# 🎟️ Token Strategy

| Token | Purpose | Expiry |
|---|---|---|
| 🔑 Access Token | Access protected resources | 15 minutes |
| 🔄 Refresh Token | Generate new Access Tokens | 7 days |

## Why two tokens?

    Short-lived Access Token
            ↓
       Better security 🔐
            ↓
    Token expires quickly
            ↓
       Refresh Token
            ↓
    Generate new Access Token
            ↓
     User stays logged in 🚀

---

# 🔄 Refresh Token Flow

    Access Token expires
            │
            ▼
    POST /auth/refresh
            │
            ▼
    Get Refresh Token from Cookie
            │
            ▼
        jwt.verify()
            │
            ▼
    Check token in MongoDB
            │
       ┌────┴─────┐
       │          │
      NO ❌       YES ✅
       │          │
    Reject       Create new
    401          Access Token

The refresh token is checked in two ways.

## 1️⃣ JWT Verification

    jwt.verify()

Checks:

- Token signature
- Token validity
- Token expiration

## 2️⃣ Database Validation

    RefreshToken.findOne()

Checks:

- Whether the server still recognizes the token
- Whether the token has been revoked

---

# 🚪 Logout & Token Revocation

Logout does more than just clearing the browser cookie.

    User clicks Logout
            │
            ▼
    Get Refresh Token from Cookie
            │
            ▼
    Delete Refresh Token from MongoDB
            │
            ▼
    Clear HTTP-only Cookie
            │
            ▼
    Refresh Token Revoked ❌

Conceptually:

    await RefreshToken.deleteOne({
        token: refreshToken
    });

    res.clearCookie("refreshToken");

Once the refresh token is removed from the database, the server no longer recognizes it.

---

# 🛡️ Authentication vs Authorization

## Authentication 🔐

> Who are you?

Authentication verifies whether a user is genuine.

    User sends Access Token
            ↓
      authMiddleware
            ↓
        jwt.verify()
            ↓
    User authenticated ✅

---

## Authorization 🚧

> What are you allowed to do?

Authorization checks whether an authenticated user has permission to access something.

    User authenticated
            ↓
       Check user role
            ↓
       ┌────┴────┐
       │         │
      NO ❌     YES ✅
       │         │
      403      Allow Access

---

# 👑 Role-Based Access Control

Protected routes can restrict access based on roles.

Example:

    router.delete(
        "/:id",
        authMiddleware,
        authorize("admin"),
        deleteStudent
    );

Request flow:

    Request
       │
       ▼
    authMiddleware
       │
       ▼
    Verify Access Token
       │
       ▼
    req.user
       │
       ▼
    authorize("admin")
       │
       ▼
    Check role
       │
       ├── Admin ✅ → Continue
       │
       └── Not Admin ❌ → 403 Forbidden

---

# 📡 API Endpoints

## 🔐 Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login user |
| POST | `/auth/refresh` | Generate a new Access Token |
| POST | `/auth/logout` | Logout and revoke Refresh Token |

---

## 👨‍🎓 Students

| Method | Endpoint | Description |
|---|---|---|
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get student by ID |
| POST | `/students` | Create student |
| PUT | `/students/:id` | Update student |
| DELETE | `/students/:id` | Delete student |

---

# 🔎 Query Features

The API supports advanced querying features.

## Filtering

    GET /students?age=20

## Sorting

    GET /students?sort=age

## Pagination

    GET /students?page=1&limit=10

Internally:

    Student.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit);

---

# 📊 MongoDB Aggregation

MongoDB Aggregation is used for processing and analyzing data.

Concepts explored:

- `$group`
- `$sum`
- `$avg`
- `$max`
- `$min`
- `$cond`
- `$gte`
- `$lt`

Conceptually:

    Student Data
          │
          ▼
    Aggregation Pipeline
          │
          ▼
    Group / Calculate / Transform
          │
          ▼
       Final Result

---

# ⚙️ Installation

## 1️⃣ Clone the repository

    git clone YOUR_REPOSITORY_URL

## 2️⃣ Move into the project

    cd student-management-api

## 3️⃣ Install dependencies

    npm install

## 4️⃣ Create environment variables

Create a `.env` file:

    PORT=3000

    MONGODB_URI=mongodb://localhost:27017/studentDB

    JWT_SECRET=your_access_token_secret

    JWT_REFRESH_SECRET=your_refresh_token_secret

## 5️⃣ Run the server

    node server.js

Expected output:

    MongoDB Connected
    Server running on port 3000

---

# 🔑 Environment Variables

| Variable | Purpose |
|---|---|
| `PORT` | Server port |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Access Token secret |
| `JWT_REFRESH_SECRET` | Refresh Token secret |

⚠️ Never commit your real `.env` file to GitHub.

---

# 🧪 Testing Flow

The API can be tested using:

- Thunder Client
- Postman

Recommended testing flow:

    1. Register User
            ↓
    2. Login
            ↓
    3. Receive Access Token
            ↓
    4. Access Protected Route
            ↓
    5. Refresh Access Token
            ↓
    6. Logout
            ↓
    7. Try Refresh Token again ❌

---

# 🧰 Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Security

- bcrypt
- JSON Web Token
- HTTP-only Cookies

## Tools

- Git
- GitHub
- Thunder Client

---

# 🧠 Concepts Implemented

    Node.js Backend
    │
    ├── Express.js
    │   ├── Routing
    │   ├── Middleware
    │   ├── Controllers
    │   └── Error Handling
    │
    ├── REST APIs
    │   ├── CRUD
    │   ├── HTTP Methods
    │   ├── Status Codes
    │   └── Query Parameters
    │
    ├── MongoDB
    │   ├── Schemas
    │   ├── Models
    │   ├── Validation
    │   ├── Filtering
    │   ├── Sorting
    │   ├── Pagination
    │   └── Aggregation
    │
    └── Security
        ├── bcrypt
        ├── JWT
        ├── Access Tokens
        ├── Refresh Tokens
        ├── Cookies
        ├── Authentication
        ├── Authorization
        └── RBAC

---

# 🚀 Roadmap

This project is actively evolving.

### Authentication & Security

- [x] User Registration
- [x] Password Hashing
- [x] Login
- [x] JWT Authentication
- [x] Access Tokens
- [x] Refresh Tokens
- [x] Refresh Token Storage
- [x] Refresh Token Validation
- [x] Logout
- [x] Token Revocation
- [ ] Refresh Token Rotation
- [ ] Sessions
- [ ] OAuth Basics

### Database

- [x] MongoDB
- [x] Mongoose
- [x] Filtering
- [x] Sorting
- [x] Pagination
- [x] Aggregation
- [ ] Indexing
- [ ] Transactions

### Advanced Backend

- [ ] Redis Caching
- [ ] Rate Limiting
- [ ] Logging
- [ ] File Uploads
- [ ] Background Jobs
- [ ] Cron Jobs

### Production

- [ ] Docker
- [ ] Docker Compose
- [ ] API Documentation
- [ ] Automated Testing
- [ ] Deployment

---

# 🎯 Learning Journey

This repository represents my journey of learning backend development by building real features and understanding the concepts behind them.

The goal is not just to make APIs work.

The goal is to understand:

    How requests travel through a backend
            ↓
    How middleware controls request flow
            ↓
    How databases interact with applications
            ↓
    How authentication works
            ↓
    How authorization protects resources
            ↓
    How backend systems scale 🚀

---

<p align="center">

  <b>🚀 Building backend systems. One concept at a time.</b>

  <br />

  Made with Node.js, Express, MongoDB and lots of debugging. 🔥

</p>
