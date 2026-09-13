<div align="center">

<br/>

# 🔐 Student Management API

<br/>

### Not just another CRUD app.
### A backend system engineered layer by layer — from REST APIs to production-grade authentication security.

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![bcrypt](https://img.shields.io/badge/bcrypt-003366?style=for-the-badge&logo=npm&logoColor=white)](https://npmjs.com/package/bcrypt)

<br/>

![Status](https://img.shields.io/badge/Status-Active-22c55e?style=flat-square)
![Auth](https://img.shields.io/badge/Auth-JWT%20%2B%20Refresh%20Token%20System-f59e0b?style=flat-square)
![Security](https://img.shields.io/badge/Security-Token%20Families%20%2B%20Reuse%20Detection-ef4444?style=flat-square)
![Architecture](https://img.shields.io/badge/Architecture-Layered%20Monolith-6366f1?style=flat-square)

<br/>

[View Repository](https://github.com/sharma-mradul/student-management-api) · [Report Bug](https://github.com/sharma-mradul/student-management-api/issues) · [Request Feature](https://github.com/sharma-mradul/student-management-api/issues)

<br/>

</div>

---

## 💡 What Is This?

This project started as a simple Student CRUD API.

It has since been deliberately evolved into a **deeply engineered backend system** — with a layered architecture, a production-grade two-token authentication system, refresh token rotation, session security, and role-based access control.

Every layer was added intentionally. Every concept was understood before it was implemented.

> The goal was never to make an API that works.
> The goal was to understand how backend systems are *actually* built.

---

## ⚡ Features at a Glance

<table>
<tr>
<td width="50%">

### 🎓 Student Management
- Full CRUD operations
- Filtering, sorting, pagination
- MongoDB aggregation pipelines
- Student + department statistics
- Schema-level Mongoose validation

</td>
<td width="50%">

### 🔐 Authentication & Security
- bcrypt password hashing
- JWT access tokens (15 min)
- Refresh tokens (7 days)
- HTTP-only cookie transport
- Token rotation on every refresh
- Fixed maximum session lifetime
- Token family tracking
- Refresh token reuse detection
- Automatic family-wide revocation

</td>
</tr>
<tr>
<td width="50%">

### 🛡️ Authorization
- Role-Based Access Control
- `student` and `admin` roles
- Auth middleware on all protected routes
- Reusable `authorize()` middleware

</td>
<td width="50%">

### 🏗️ Architecture
- Layered monolithic design
- Routes → Controllers → Services → Models
- Global error handling middleware
- Clean separation of concerns
- Designed to evolve toward microservices

</td>
</tr>
</table>

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    Client(["🌐 Client"])
    Routes["📍 Routes"]
    Auth["🔒 Auth Middleware"]
    RBAC["🛡️ RBAC Middleware"]
    Controller["⚙️ Controllers"]
    Service["🧠 Services\n(Business Logic)"]
    Model["📦 Models\n(Mongoose)"]
    DB[("🍃 MongoDB")]

    Client --> Routes
    Routes --> Auth
    Auth --> RBAC
    RBAC --> Controller
    Controller --> Service
    Service --> Model
    Model --> DB
    DB --> Model
    Model --> Service
    Service --> Controller
    Controller --> Client
```

---

## 🔐 Authentication Architecture

### Two-Token System

```mermaid
flowchart LR
    Login(["🔑 Login"])
    AT["⚡ Access Token\n15 minutes\nAuthorization header"]
    RT["🔄 Refresh Token\n7 days\nHTTP-only cookie + MongoDB"]
    API["🔒 Protected APIs"]
    Refresh["♻️ /auth/refresh"]
    NewAT["⚡ New Access Token"]

    Login --> AT
    Login --> RT
    AT --> API
    RT --> Refresh
    Refresh --> NewAT
    NewAT --> API
```

### Token Rotation Flow

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant MongoDB

    Client->>Server: POST /auth/refresh (R1 in cookie)
    Server->>MongoDB: Verify R1 is ACTIVE
    MongoDB-->>Server: ✅ Valid
    Server->>MongoDB: Mark R1 as USED
    Server->>MongoDB: Create R2 as ACTIVE
    Server-->>Client: New Access Token + R2 cookie

    Note over Client,MongoDB: If R1 is presented again...

    Client->>Server: POST /auth/refresh (R1 again)
    Server->>MongoDB: Verify R1
    MongoDB-->>Server: ❌ R1 is USED — REUSE DETECTED
    Server->>MongoDB: Revoke entire token family
    Server-->>Client: 401 Unauthorized — Force re-login
```

---

## 🚨 Security: Token Families & Reuse Detection

This is the most sophisticated part of the system.

**Every login session gets a unique `familyId`.** All rotated tokens from that session share it.

```
LOGIN SESSION
     │
     ├── familyId: ABC123
     │
     ├── R1 (active)
     ├── R2 (active after refresh)
     ├── R3 (active after refresh)
     └── R4 (currently active)
```

**If a previously used token is presented again:**

```
R1 presented → R1 is USED
       │
       ▼
🚨 REUSE DETECTED
       │
       ▼
Locate family ABC123
       │
       ▼
Revoke R1 + R2 + R3 + R4 instantly
       │
       ▼
Force re-authentication
```

This automatically detects and responds to **stolen refresh tokens** without any manual intervention.

**Fixed session expiry** ensures the session deadline never extends — regardless of how many times the token is refreshed:

```
Login Day 0  →  Deadline: Day 7
R1  →  expires Day 7
R2  →  expires Day 7   ← deadline never moves
R3  →  expires Day 7
R4  →  expires Day 7
```

---

## 📡 API Reference

### 🔐 Authentication

| Method | Endpoint | Auth Required | Description |
|:---:|---|:---:|---|
| `POST` | `/auth/register` | ❌ | Register a new user |
| `POST` | `/auth/login` | ❌ | Login and receive tokens |
| `POST` | `/auth/refresh` | 🍪 Cookie | Rotate token, get new access token |
| `POST` | `/auth/logout` | 🍪 Cookie | Revoke session and clear cookie |

### 👨‍🎓 Students

| Method | Endpoint | Role | Description |
|:---:|---|:---:|---|
| `POST` | `/students` | `admin` | Create a student |
| `GET` | `/students` | Any | Get all students |
| `GET` | `/students/:id` | Any | Get student by ID |
| `PUT` | `/students/:id` | `admin` | Update student |
| `DELETE` | `/students/:id` | `admin` | Delete student |
| `GET` | `/students/stats` | Any | Student statistics |
| `GET` | `/students/stats/department` | Any | Department statistics |

### Query Parameters

```http
GET /students?cgpa=9&sort=name&page=1&limit=10
```

| Parameter | Type | Description |
|---|---|---|
| `cgpa` | `Number` | Filter by CGPA |
| `sort` | `String` | Sort field |
| `page` | `Number` | Page number |
| `limit` | `Number` | Results per page |

---

## 💻 API in Action

### Register a User

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mradul Sharma",
    "email": "mradul@example.com",
    "password": "securepassword123",
    "role": "admin"
  }'
```

```json
{
  "message": "User registered successfully"
}
```

---

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mradul@example.com",
    "password": "securepassword123"
  }'
```

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> Refresh token is set automatically as an HTTP-only cookie.

---

### Access a Protected Route

```bash
curl -X GET http://localhost:3000/students \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

```json
{
  "students": [...],
  "total": 25,
  "page": 1,
  "limit": 10
}
```

---

### Refresh Access Token

```bash
curl -X POST http://localhost:3000/auth/refresh \
  --cookie "refreshToken=<your-refresh-token>"
```

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> Old refresh token is revoked. New one is set in cookie automatically.

---

### Create a Student (Admin only)

```bash
curl -X POST http://localhost:3000/students \
  -H "Authorization: Bearer <access-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rahul Verma",
    "cgpa": 8.9
  }'
```

```json
{
  "message": "Student created successfully",
  "student": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Rahul Verma",
    "cgpa": 8.9
  }
}
```

---

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/sharma-mradul/student-management-api.git
cd student-management-api

# 2. Install
npm install

# 3. Configure
cp .env.example .env
# Edit .env with your values

# 4. Start
node server.js
```

**Expected output:**
```
server running on port 3000
mongodb connected
```

### Environment Variables

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/studentDB
JWT_SECRET=your_access_token_secret_here
JWT_REFRESH_SECRET=your_refresh_token_secret_here
```

> ⚠️ Never commit `.env` to version control. Use `.env.example` to document required variables.

---

## 📁 Project Structure

```
student-management-api/
│
├── config/
│   └── db.js                     # MongoDB connection
│
├── controllers/
│   ├── authController.js         # Auth request handlers
│   └── studentController.js      # Student request handlers
│
├── middlewares/
│   ├── authMiddleware.js         # JWT verification
│   ├── errorMiddleware.js        # Global error handling
│   └── roleMiddleware.js         # RBAC enforcement
│
├── models/
│   ├── User.js                   # User schema + bcrypt hooks
│   ├── Student.js                # Student schema + validation
│   └── RefreshToken.js           # Token tracking schema
│
├── routes/
│   ├── authRoutes.js             # /auth/* routing
│   └── studentRoutes.js          # /students/* routing
│
├── services/
│   └── studentService.js         # Student business logic
│
├── .env.example                  # Environment variable template
├── package.json
└── server.js                     # Entry point
```

---

## 🗺️ Roadmap

| Phase | Focus | Status |
|---|---|:---:|
| Phase 1 | REST API + CRUD | ✅ Done |
| Phase 2 | Layered Architecture | ✅ Done |
| Phase 3 | JWT Authentication | ✅ Done |
| Phase 4 | Auth Security (Rotation · Families · Reuse Detection) | ✅ Done |
| Phase 5 | Architecture Hardening (Repository Pattern · Clean Architecture) | 🔄 In Progress |
| Phase 6 | Redis + Caching + Rate Limiting | ⏳ Upcoming |
| Phase 7 | Real-Time Systems (WebSockets · Socket.IO) | ⏳ Upcoming |
| Phase 8 | Message Queues (RabbitMQ · Kafka) | ⏳ Upcoming |
| Phase 9 | Docker + CI/CD + Deployment | ⏳ Upcoming |
| Phase 10 | Microservices + System Design | ⏳ Upcoming |

---

## 🧰 Tech Stack

| Category | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB |
| **ODM** | Mongoose |
| **Authentication** | JSON Web Tokens (JWT) |
| **Password Security** | bcrypt |
| **Session Transport** | HTTP-only Cookies |
| **API Testing** | Thunder Client |
| **DB Management** | MongoDB Compass |
| **Version Control** | Git + GitHub |

---

## 📊 Implementation Status

```
Core Backend
  ✅ Express server + routing
  ✅ Middleware pipeline
  ✅ Controller / Service / Model separation
  ✅ Global error handling

Database
  ✅ MongoDB + Mongoose
  ✅ Schema validation
  ✅ Filtering + sorting + pagination
  ✅ Aggregation pipelines

Authentication
  ✅ User registration
  ✅ bcrypt password hashing
  ✅ JWT access tokens (15 min)
  ✅ JWT refresh tokens (7 days)
  ✅ HTTP-only cookie transport
  ✅ Refresh token DB persistence
  ✅ Token rotation
  ✅ Fixed session expiry
  ✅ Token families
  ✅ Reuse detection
  ✅ Family-wide revocation
  ✅ Logout with server-side revocation

Authorization
  ✅ Auth middleware
  ✅ Role-Based Access Control
  ✅ Protected routes
  ✅ Reusable authorize() middleware

Up Next
  🔄 Secure cookie hardening
  🔄 Authentication edge cases
  ⏳ Redis caching
  ⏳ Rate limiting
  ⏳ Docker
```

---

<div align="center">

<br/>

## 👨‍💻 Author

**Mradul Sharma**

*B.Tech Computer Science Engineering · VIT Bhopal University*

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-sharma--mradul-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sharma-mradul)
[![Email](https://img.shields.io/badge/Email-mradulfpu@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mradulfpu@gmail.com)

<br/>

---

*Building backend systems one concept at a time.* 🔥

<br/>

</div>
