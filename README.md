<p align="center">

# 🚀 Student Management API

### A backend engineering project evolving from CRUD → Authentication → Security → Distributed Systems

</p>

<p align="center">
  <b>Built with Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt and HTTP-only cookies.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge&logo=mongoose&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Authentication-black?style=flat-square&logo=jsonwebtokens" />
  <img src="https://img.shields.io/badge/Bcrypt-Password%20Security-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/REST-API-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" />
</p>

<p align="center">

  <a href="https://github.com/sharma-mradul/student-management-api">
    <img src="https://img.shields.io/badge/View%20Repository-GitHub-181717?style=for-the-badge&logo=github" />
  </a>

</p>

---

# 📌 Overview

**Student Management API** is a backend REST API built using **Node.js, Express.js, MongoDB and Mongoose**.

What started as a simple Student CRUD API is being continuously evolved into a deeper backend engineering project.

The project currently explores:

- REST API design
- Express routing
- Middleware
- Controllers
- Services
- MongoDB
- Mongoose
- Schema validation
- CRUD operations
- Filtering
- Sorting
- Pagination
- Aggregation
- Password hashing
- JWT authentication
- Access tokens
- Refresh tokens
- HTTP-only cookies
- Token revocation
- Refresh-token rotation
- Fixed session expiration
- Refresh-token reuse detection
- Token families
- Role-Based Access Control
- Error handling

The long-term goal is to evolve the project toward:

```text
CRUD
  ↓
REST APIs
  ↓
Authentication
  ↓
Security
  ↓
Backend Architecture
  ↓
Redis & Caching
  ↓
Real-Time Systems
  ↓
Message Queues
  ↓
Distributed Systems
  ↓
Scalability
  ↓
Docker & Deployment
  ↓
Microservices
  ↓
System Design
```

---

# 🎯 Project Philosophy

This project is being built using a:

```text
LEARN
  ↓
UNDERSTAND
  ↓
IMPLEMENT
  ↓
TEST
  ↓
DEBUG
  ↓
IMPROVE
  ↓
COMMIT
  ↓
NEXT CONCEPT
```

The goal is **not simply to make an API work**.

The goal is to understand:

> What happens when an HTTP request enters a backend?

> How does middleware control the request?

> Where does business logic belong?

> How does the backend communicate with MongoDB?

> How does authentication actually work?

> How are sessions secured?

> How can a backend eventually scale?

---

# ✨ Current Features

## 👨‍🎓 Student Management

- Create students
- Get all students
- Get student by ID
- Update students
- Delete students
- Filtering
- Sorting
- Pagination
- Student statistics
- Department statistics
- Mongoose validation

---

# 🔐 Authentication

The authentication system currently includes:

- User registration
- Password hashing with bcrypt
- Login
- JWT access tokens
- JWT refresh tokens
- HTTP-only refresh-token cookies
- Refresh-token persistence in MongoDB
- Refresh-token validation
- Refresh-token rotation
- Fixed maximum session lifetime
- Token families
- Refresh-token reuse detection
- Family-wide token revocation
- Logout

---

# 🛡️ Authorization

Authentication and authorization are two different concepts.

### Authentication

> **Who are you?**

The backend verifies that the user possesses a valid credential.

```text
Client
  ↓
Access Token
  ↓
authMiddleware
  ↓
jwt.verify()
  ↓
Authenticated User
```

### Authorization

> **What are you allowed to do?**

After authentication, the backend checks permissions.

```text
Authenticated User
        ↓
     Check Role
        ↓
   ┌────┴────┐
   ↓         ↓
 Admin     Student
   ↓         ↓
Allowed   Restricted
```

The project currently uses:

```text
student
admin
```

Example:

```js
router.delete(
    "/:id",
    authMiddleware,
    authorize("admin"),
    deleteStudent
);
```

---

# 🏗️ Backend Architecture

The project currently follows a **layered monolithic architecture**.

```text
                         CLIENT
                           │
                           ▼
                    ┌─────────────┐
                    │    ROUTES   │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ MIDDLEWARE  │
                    │             │
                    │ Auth        │
                    │ RBAC        │
                    │ Errors      │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ CONTROLLERS │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  SERVICES   │
                    │ Business    │
                    │ Logic       │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   MODELS    │
                    │  Mongoose   │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  MongoDB    │
                    └─────────────┘
```

### Responsibility Flow

```text
Route
  ↓
Receives request
  ↓
Middleware
  ↓
Authentication / Authorization
  ↓
Controller
  ↓
Handles HTTP request/response
  ↓
Service
  ↓
Business logic
  ↓
Model
  ↓
Database
```

The architecture will become more sophisticated as the project progresses.

---

# 📁 Project Structure

```text
student-management-api
│
├── config
│   └── db.js
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
│   └── studentService.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

---

# 🔄 Request Lifecycle

One of the core concepts being learned through this project is the complete lifecycle of a backend request.

```text
                    HTTP REQUEST
                         │
                         ▼
                  Express Server
                         │
                         ▼
                      Route
                         │
                         ▼
                    Middleware
                         │
              ┌──────────┴──────────┐
              │                     │
         Authentication         Authorization
              │                     │
              └──────────┬──────────┘
                         │
                         ▼
                    Controller
                         │
                         ▼
                     Service
                         │
                         ▼
                     Model
                         │
                         ▼
                    MongoDB
                         │
                         ▼
                    Controller
                         │
                         ▼
                  HTTP RESPONSE
```

---

# 🔑 Authentication Architecture

The project uses a **two-token authentication system**.

```text
                       LOGIN
                         │
                         ▼
                  Verify Credentials
                         │
                         ▼
                ┌────────┴────────┐
                │                 │
                ▼                 ▼
          ACCESS TOKEN       REFRESH TOKEN
             15 min             Up to 7 days
                │                 │
                │                 ├── MongoDB
                │                 │
                │                 └── HTTP-only Cookie
                │
                ▼
          Protected APIs
```

---

# 🎟️ Access Token vs Refresh Token

| Token | Purpose | Lifetime | Storage / Usage |
|---|---|---:|---|
| 🔑 Access Token | Access protected resources | 15 minutes | `Authorization` header |
| 🔄 Refresh Token | Obtain a new access token | Up to 7 days | HTTP-only cookie + DB |

---

# 🔑 What Is an Access Token?

The access token is the credential used to access protected API resources.

Example:

```http
Authorization: Bearer <access-token>
```

Flow:

```text
Client
  │
  │ Authorization: Bearer Token
  ▼
Protected Route
  │
  ▼
authMiddleware
  │
  ▼
jwt.verify()
  │
  ▼
Valid?
  │
  ├── NO ──→ 401 Unauthorized
  │
  └── YES
       │
       ▼
    req.user
       │
       ▼
   Controller
```

The access token is intentionally short-lived.

Current lifetime:

```text
15 minutes
```

This limits the useful lifetime of a stolen access token.

---

# 🔄 What Is a Refresh Token?

A refresh token is used to obtain a **new access token** after the access token expires.

The refresh token is **not normally used to access student endpoints directly**.

Instead:

```text
Access Token Expires
        │
        ▼
POST /auth/refresh
        │
        ▼
Read Refresh Token
        │
        ▼
Verify JWT
        │
        ▼
Check MongoDB
        │
        ▼
Rotate Refresh Token
        │
        ▼
Create New Access Token
        │
        ▼
Return Access Token
```

This allows a user to stay logged in without continuously entering their password.

---

# 🤔 Why Use Two Tokens?

A long-lived access token would be convenient but creates a larger security window.

### One long-lived token

```text
JWT
 │
 ├────────────── 7 DAYS ──────────────┐
 │                                    │
 ▼                                    ▼
If stolen                        Attacker can
                                  use it until
                                  expiration
```

### Two-token architecture

```text
ACCESS TOKEN
     │
     └── 15 minutes
             ↓
          Expires
             ↓
       Refresh Token
             │
             ▼
      New Access Token
```

This separates:

```text
"Access the API"
```

from:

```text
"Continue the authenticated session"
```

---

# 🔄 Refresh Token Rotation

The project uses **refresh-token rotation**.

Instead of repeatedly using the same refresh token:

```text
R1
 │
 ├── refresh
 ▼
R2
 │
 ├── refresh
 ▼
R3
 │
 ├── refresh
 ▼
R4
```

Each successful refresh replaces the previous refresh token.

The previous token becomes:

```text
USED
```

while the new token becomes:

```text
ACTIVE
```

Conceptually:

```text
R1 → USED
R2 → ACTIVE
```

Then:

```text
R2 → USED
R3 → ACTIVE
```

---

# 🧠 Why Rotate Refresh Tokens?

Without rotation:

```text
R1 ────────────────→ R1
        refresh
        refresh
        refresh
        refresh
```

The same refresh token remains usable throughout the session.

With rotation:

```text
R1 → R2 → R3 → R4
```

Each token is intended to be used once.

This gives the backend the ability to detect suspicious reuse.

---

# ⏳ Fixed Session Expiration

A critical concept is the difference between:

### Token Lifetime

How long one individual token is valid.

### Session Lifetime

How long the overall login session is allowed to continue.

The project uses a **fixed maximum session lifetime**.

Example:

```text
LOGIN
Monday 10 AM
     │
     │
     ├── R1
     │
     ├── R1 → R2
     │
     ├── R2 → R3
     │
     ├── R3 → R4
     │
     ▼
NEXT MONDAY 10 AM
SESSION DEADLINE
```

The refresh operation does **not** reset the seven-day clock.

Bad design:

```text
Day 0
R1 → expires Day 7

Day 1
R1 → R2 → expires Day 8

Day 2
R2 → R3 → expires Day 9

Day 3
R3 → R4 → expires Day 10
```

This could keep extending the session indefinitely.

Instead:

```text
R1 → Day 7
R2 → Day 7
R3 → Day 7
R4 → Day 7
```

The tokens rotate.

The session deadline does not.

---

# 🧬 Refresh Token Families

Every login session gets a unique `familyId`.

Example:

```text
LOGIN
  │
  ▼
familyId = ABC123
  │
  ├── R1
  ├── R2
  ├── R3
  └── R4
```

All rotated refresh tokens belonging to the same login session share the same family.

The `familyId` allows the backend to answer:

> Which refresh tokens belong to this session?

---

# 🆔 Why `familyId`?

The backend needs a way to group rotated tokens.

Example:

```text
User logs in
      │
      ▼
Family A
      │
      ├── R1
      ├── R2
      └── R3
```

Another login can create another family:

```text
User
 ├── Login Session A
 │      ├── R1
 │      ├── R2
 │      └── R3
 │
 └── Login Session B
        ├── R4
        └── R5
```

This allows the backend to revoke one session without necessarily affecting every other session.

---

# 🚨 Refresh Token Reuse Detection

Rotation creates an important security signal.

Suppose:

```text
R1 → R2
```

After successful rotation:

```text
R1 = USED
R2 = ACTIVE
```

Now imagine someone tries to use R1 again.

```text
                R1
                 │
                 ▼
          Already USED
                 │
                 ▼
        🚨 REUSE DETECTED
```

This could indicate that an old refresh token was stolen.

The project therefore treats reuse as a serious security event.

---

# 💥 Token Family Revocation

When an already-used refresh token is presented again:

```text
R1 = USED
      │
      ▼
🚨 REUSE DETECTED
      │
      ▼
Find familyId
      │
      ▼
Family ABC123
      │
      ├── R1
      ├── R2
      ├── R3
      └── R4
      │
      ▼
Revoke Family
```

Conceptually:

```text
R1 → REVOKED
R2 → REVOKED
R3 → REVOKED
R4 → REVOKED
```

This kills the entire session family.

---

# 🧪 Reuse Detection Test

The feature has been tested manually.

Expected sequence:

```text
LOGIN
  ↓
R1 ACTIVE
  ↓
R1 → /refresh
  ↓
R1 USED
R2 ACTIVE
  ↓
R1 used again
  ↓
🚨 REUSE DETECTED
  ↓
401 Unauthorized
  ↓
Entire family revoked
  ↓
R2 → 401 Unauthorized
```

This verifies that the backend does not simply reject the reused token but also invalidates the active session family.

---

# 🗃️ Refresh Token Database Model

Refresh-token records conceptually contain:

```text
RefreshToken
│
├── userId
├── token
├── familyId
├── status
└── expiresAt
```

Status can be:

```text
active
used
revoked
```

Example:

```text
┌────────────┬──────────┬──────────┐
│ Token      │ Family   │ Status   │
├────────────┼──────────┼──────────┤
│ R1         │ ABC123   │ used     │
│ R2         │ ABC123   │ active   │
└────────────┴──────────┴──────────┘
```

---

# 🔍 Refresh Token Validation

Refresh tokens are validated through multiple layers.

## Layer 1 — JWT Verification

```js
jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET
);
```

This verifies the JWT's cryptographic validity and expiration.

---

## Layer 2 — Database Validation

The backend also checks MongoDB.

Conceptually:

```text
JWT Verification
      │
      ▼
"Is this token mathematically valid?"
      │
      ▼
MongoDB
      │
      ▼
"Does the server still recognize and allow it?"
```

This is important because a JWT can be cryptographically valid while the server has already revoked it.

---

# 🍪 HTTP-only Cookies

The refresh token is delivered through an HTTP-only cookie.

```text
Server
  │
  │ Set-Cookie
  ▼
Browser
  │
  │ HTTP-only Cookie
  ▼
Refresh Request
  │
  ▼
Server
```

`httpOnly` prevents normal client-side JavaScript from directly reading the cookie.

This helps reduce exposure of the refresh token to JavaScript-based attacks.

---

# 🚪 Logout

Logout invalidates the refresh-token session on the server and clears the cookie.

Conceptually:

```text
User Logout
     │
     ▼
Read Refresh Token
     │
     ▼
Revoke Token
     │
     ▼
Clear Cookie
     │
     ▼
Session Cannot Refresh
```

The important concept is:

> Clearing the browser cookie alone is not enough.

The server should also stop accepting the refresh token.

---

# 🔐 Authentication vs Authorization

```text
AUTHENTICATION
      │
      ▼
"Who are you?"
      │
      ▼
Verify Identity
      │
      ▼
Authenticated
```

versus:

```text
AUTHORIZATION
      │
      ▼
"What can you do?"
      │
      ▼
Check Permissions
      │
      ▼
Allow / Deny
```

---

# 🚦 HTTP Status Codes

| Status | Meaning | Example |
|---:|---|---|
| `200` | Successful request | Login / Refresh |
| `201` | Resource created | Registration |
| `401` | Authentication failed | Invalid / expired / revoked token |
| `403` | Authenticated but forbidden | Student attempting admin action |
| `500` | Internal server error | Unexpected backend failure |

A useful distinction:

```text
401
│
└── "I cannot accept your credentials."

403
│
└── "I know who you are, but you are not allowed."
```

---

# 📡 API Endpoints

## 🔐 Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login user |
| `POST` | `/auth/refresh` | Rotate refresh token and generate new access token |
| `POST` | `/auth/logout` | Logout and invalidate refresh token |

---

## 👨‍🎓 Students

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/students` | Create student |
| `GET` | `/students` | Get all students |
| `GET` | `/students/:id` | Get student by ID |
| `PUT` | `/students/:id` | Update student |
| `DELETE` | `/students/:id` | Delete student |
| `GET` | `/students/stats` | Get student statistics |
| `GET` | `/students/stats/department` | Get department statistics |

---

# 🔎 Query Features

The API supports querying student data.

## Filtering

```http
GET /students?cgpa=9
```

## Sorting

```http
GET /students?sort=cgpa
```

## Pagination

```http
GET /students?page=1&limit=10
```

Conceptually:

```text
Request
  │
  ├── filter
  ├── sort
  ├── page
  └── limit
       │
       ▼
Student.find(filter)
       │
       ▼
.sort(sort)
       │
       ▼
.skip(skip)
       │
       ▼
.limit(limit)
       │
       ▼
MongoDB
```

---

# 📊 MongoDB Aggregation

The project also uses MongoDB aggregation pipelines for statistics.

Concepts explored:

- `$group`
- `$sum`
- `$avg`
- `$max`
- `$min`
- `$cond`
- `$gte`
- `$lt`

Flow:

```text
Student Documents
       │
       ▼
Aggregation Pipeline
       │
       ├── Group
       ├── Count
       ├── Average
       ├── Maximum
       ├── Minimum
       └── Conditional Calculations
       │
       ▼
Statistics
```

---

# 🧩 Data Models

## User

```text
User
├── name
├── email
├── password
└── role
```

Password is stored as a bcrypt hash rather than the original plaintext password.

Roles:

```text
student
admin
```

---

## Student

```text
Student
├── name
└── cgpa
```

Validation includes:

```text
Name
├── required
├── minimum length
└── maximum length

CGPA
├── required
├── minimum = 0
└── maximum = 10
```

---

## RefreshToken

```text
RefreshToken
├── userId
├── token
├── familyId
├── status
└── expiresAt
```

---

# 🧪 Testing

The API is currently tested using:

- Thunder Client
- MongoDB Compass

Authentication testing includes:

```text
Register
   ↓
Login
   ↓
Access Protected Route
   ↓
Refresh
   ↓
Verify Token Rotation
   ↓
Reuse Old Token
   ↓
Verify Reuse Detection
   ↓
Verify Family Revocation
   ↓
Logout
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/sharma-mradul/student-management-api.git
```

## 2. Enter the project

```bash
cd student-management-api
```

## 3. Install dependencies

```bash
npm install
```

## 4. Create `.env`

Create a `.env` file in the project root:

```env
PORT=3000

MONGODB_URI=mongodb://localhost:27017/studentDB

JWT_SECRET=your_access_token_secret

JWT_REFRESH_SECRET=your_refresh_token_secret
```

## 5. Start the server

```bash
node server.js
```

Expected output:

```text
server running on port 3000
mongodb connected
```

---

# 🔑 Environment Variables

| Variable | Purpose |
|---|---|
| `PORT` | Express server port |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Access-token signing secret |
| `JWT_REFRESH_SECRET` | Refresh-token signing secret |

> ⚠️ Never commit the real `.env` file to GitHub.

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
- JSON Web Tokens
- HTTP-only cookies
- Refresh-token sessions
- Role-Based Access Control

## Development

- Git
- GitHub
- Thunder Client
- MongoDB Compass

---

# 🧠 Concepts Implemented

```text
                         BACKEND
                            │
       ┌────────────────────┼────────────────────┐
       │                    │                    │
       ▼                    ▼                    ▼
    NODE.JS              EXPRESS             MONGODB
       │                    │                    │
       │               ┌────┼────┐         ┌────┼────┐
       │               │    │    │         │    │    │
       ▼               ▼    ▼    ▼         ▼    ▼    ▼
    Runtime          Routes  MW  Controllers Schemas Models
                                             │
                                             ▼
                                           CRUD
                                             │
                           ┌─────────────────┼─────────────────┐
                           │                 │                 │
                           ▼                 ▼                 ▼
                       Filtering          Sorting          Pagination
                                                              
                            │
                            ▼
                        SECURITY
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
           bcrypt          JWT          Cookies
                            │
                  ┌─────────┴─────────┐
                  │                   │
                  ▼                   ▼
             Access Token        Refresh Token
                 15m                 7d
                                      │
                              ┌───────┴────────┐
                              │                │
                              ▼                ▼
                           Rotation       Token Family
                                               │
                                               ▼
                                        Reuse Detection
                                               │
                                               ▼
                                        Family Revocation
```

---

# 🗺️ Project Evolution

The project is intentionally being evolved in stages.

## Phase 1 — Basic Backend

```text
Node.js
   ↓
Express
   ↓
REST API
   ↓
CRUD
   ↓
MongoDB
```

## Phase 2 — Structured Backend

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Models
   ↓
MongoDB
```

## Phase 3 — Authentication

```text
Registration
   ↓
bcrypt
   ↓
Login
   ↓
JWT
   ↓
Access Token
   +
Refresh Token
```

## Phase 4 — Authentication Security

```text
Refresh Tokens
      ↓
Database Tracking
      ↓
Rotation
      ↓
Fixed Session Expiry
      ↓
Token Families
      ↓
Reuse Detection
      ↓
Family Revocation
```

## Phase 5 — Advanced Backend

```text
Redis
  ↓
Caching
  ↓
Logging
  ↓
Rate Limiting
  ↓
File Uploads
  ↓
Background Jobs
  ↓
Cron Jobs
```

## Phase 6 — Real-Time Systems

```text
WebSockets
   ↓
Socket.IO
   ↓
Chat Systems
   ↓
Notifications
   ↓
SSE
```

## Phase 7 — Distributed Systems

```text
RabbitMQ
   ↓
Kafka
   ↓
Event-Driven Architecture
   ↓
CAP Theorem
```

## Phase 8 — Scalability

```text
Load Balancer
      ↓
Nginx
      ↓
Horizontal Scaling
      ↓
Replication
      ↓
Sharding
```

## Phase 9 — Production

```text
Docker
   ↓
Docker Compose
   ↓
CI/CD
   ↓
Monitoring
   ↓
Deployment
```

## Phase 10 — System Design

```text
Microservices
      ↓
Service Discovery
      ↓
Observability
      ↓
Distributed Caching
      ↓
Performance Engineering
      ↓
System Design
```

---

# 🏗️ Long-Term Architecture

The current project is a **monolith**.

That is intentional.

The goal is to understand the architecture before splitting it.

### Current

```text
                    STUDENT MANAGEMENT API
                             │
             ┌───────────────┼───────────────┐
             │               │               │
             ▼               ▼               ▼
          Auth API      Student API      Other Logic
             │               │               │
             └───────────────┼───────────────┘
                             │
                             ▼
                          MongoDB
```

### Future Exploration

```text
                         API GATEWAY
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
            ▼                 ▼                 ▼
      AUTH SERVICE      STUDENT SERVICE    OTHER SERVICES
            │                 │                 │
            └─────────────────┼─────────────────┘
                              │
                              ▼
                    MESSAGE / EVENT LAYER
                              │
                 ┌────────────┴────────────┐
                 │                         │
                 ▼                         ▼
               Redis                   Databases
```

The project will evolve toward distributed architecture **after understanding the underlying concepts**, rather than jumping directly into microservices.

---

# 🚧 Roadmap

## 🟢 Core Backend

- [x] Node.js
- [x] Express.js
- [x] Routing
- [x] Middleware
- [x] Controllers
- [x] Services
- [x] Error handling
- [x] REST APIs
- [x] CRUD

---

## 🟢 Database

- [x] MongoDB
- [x] Mongoose
- [x] Schemas
- [x] Models
- [x] Validation
- [x] Filtering
- [x] Sorting
- [x] Pagination
- [x] Aggregation
- [ ] Indexing
- [ ] Transactions

---

## 🟢 Authentication

- [x] User Registration
- [x] Password Hashing
- [x] Login
- [x] JWT Authentication
- [x] Access Tokens
- [x] Refresh Tokens
- [x] HTTP-only Cookies
- [x] Refresh Token Storage
- [x] Refresh Token Validation
- [x] Logout
- [x] Token Revocation
- [x] Refresh Token Rotation
- [x] Fixed Session Expiry
- [x] Token Families
- [x] Refresh Token Reuse Detection
- [x] Family-wide Revocation

---

## 🟢 Authorization

- [x] Authentication Middleware
- [x] Protected Routes
- [x] Role-Based Access Control
- [x] Reusable Authorization Middleware
- [ ] Advanced Permission System

---

## 🟡 Authentication Hardening

- [ ] Secure Refresh Token Storage
- [ ] Refresh Token Hashing / Stronger Token Identification
- [ ] Secure Cookie Configuration
- [ ] Authentication Edge Cases
- [ ] Session Management Improvements
- [ ] OAuth Basics

---

## 🟡 Backend Architecture

- [ ] Controller vs Service Responsibilities
- [ ] Repository Pattern
- [ ] Clean Architecture
- [ ] Better Module Boundaries
- [ ] Improved Error Architecture

---

## 🔴 Advanced Backend

- [ ] Redis
- [ ] Caching
- [ ] Logging
- [ ] Rate Limiting
- [ ] File Uploads
- [ ] Background Jobs
- [ ] Cron Jobs

---

## 🔴 Real-Time Systems

- [ ] WebSockets
- [ ] Socket.IO
- [ ] Chat Systems
- [ ] Notifications
- [ ] Server-Sent Events

---

## 🔴 Distributed Systems

- [ ] RabbitMQ
- [ ] Kafka Basics
- [ ] Event-Driven Architecture
- [ ] CAP Theorem

---

## 🔴 Scalability

- [ ] Load Balancers
- [ ] Nginx
- [ ] Horizontal Scaling
- [ ] Replication
- [ ] Sharding

---

## 🔴 GraphQL

- [ ] GraphQL
- [ ] Resolvers
- [ ] Apollo Server
- [ ] GraphQL vs REST

---

## 🔴 Production

- [ ] Docker
- [ ] Docker Compose
- [ ] CI/CD
- [ ] Automated Testing
- [ ] Monitoring
- [ ] Deployment

---

## 🔴 Extreme Level System Design

- [ ] Microservices
- [ ] Service Discovery
- [ ] Observability
- [ ] Distributed Caching
- [ ] Performance Engineering
- [ ] System Design

---

# 🏆 Current Milestone

```text
                    🔐 AUTHENTICATION

Registration                 ✅
Password Hashing             ✅
Login                        ✅
Access Tokens                ✅
Refresh Tokens               ✅
HTTP-only Cookies            ✅
Token Validation             ✅
Token Revocation             ✅
Logout                       ✅
Refresh Rotation             ✅
Fixed Session Expiry         ✅
Token Families               ✅
Reuse Detection              ✅
Family Revocation            ✅


                    🚧 NEXT

Secure Token Storage         ⏳
Secure Cookies               ⏳
Authentication Edge Cases    ⏳
Architecture                 ⏳
Redis                        ⏳
Caching                      ⏳
Queues                       ⏳
Real-Time Systems            ⏳
Scaling                      ⏳
Docker                       ⏳
Microservices                ⏳
System Design                ⏳
```

---

# 🧠 What This Project Is Really Teaching

This repository is becoming more than a Student CRUD API.

It is a practical exploration of how backend systems evolve:

```text
HTTP
 ↓
Node.js
 ↓
Express
 ↓
REST APIs
 ↓
Middleware
 ↓
Databases
 ↓
Authentication
 ↓
Authorization
 ↓
Session Security
 ↓
Caching
 ↓
Background Processing
 ↓
Real-Time Systems
 ↓
Message Queues
 ↓
Distributed Systems
 ↓
Scalability
 ↓
Production Engineering
 ↓
System Design
```

---

# 🎯 Learning Objective

The goal is not:

> Build another CRUD application.

The goal is:

> **Understand how modern backend systems are designed, secured, tested, scaled and eventually distributed.**

Every feature exists to teach an underlying backend engineering concept.

---

# 📚 Core Mental Models

## Request

```text
Request
  ↓
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
Database
  ↓
Response
```

## Authentication

```text
Credentials
  ↓
bcrypt
  ↓
User Verification
  ↓
Access Token + Refresh Token
  ↓
Access Token → API Access
  ↓
Refresh Token → Session Renewal
  ↓
Rotation
  ↓
Token Family
  ↓
Reuse Detection
  ↓
Family Revocation
```

## Authorization

```text
Authenticated User
       ↓
     Role
       ↓
   Permission
       ↓
Allow / Deny
```

---

# 🔥 Engineering Rule

```text
Don't just copy code.

Understand the request.
Understand the data.
Understand the architecture.
Understand the security model.
Understand the failure cases.

Then write the code.
```

---

# 🚀 Final Vision

```text
             SIMPLE CRUD API
                    │
                    ▼
              REST API
                    │
                    ▼
          AUTHENTICATION SYSTEM
                    │
                    ▼
             SECURITY LAYER
                    │
                    ▼
          CLEAN ARCHITECTURE
                    │
                    ▼
              REDIS / CACHE
                    │
                    ▼
          BACKGROUND PROCESSING
                    │
                    ▼
           REAL-TIME SYSTEMS
                    │
                    ▼
          MESSAGE QUEUES
                    │
                    ▼
         DISTRIBUTED SYSTEMS
                    │
                    ▼
              SCALABILITY
                    │
                    ▼
             PRODUCTION
                    │
                    ▼
             MICROSERVICES
                    │
                    ▼
              SYSTEM DESIGN
```

---

# 👨‍💻 Author

**MRADUL SHARMA**

Learning backend engineering by building, breaking, debugging and rebuilding.

<p align="center">

### 🚀 Building backend systems. One concept at a time.

</p>

<p align="center">
<i>Built with Node.js, Express, MongoDB and a lot of debugging. 🔥</i>
</p>
