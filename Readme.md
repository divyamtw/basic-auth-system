🔐 Basic Auth System

A simple and secure authentication system built with Node.js, Express, and MongoDB.
It includes user registration, login with JWT cookies, protected routes, and logout functionality — perfect for learning backend auth or using as a boilerplate for small projects.

⚙️ Features

🧾 Register/Login with email and password

🔒 JWT authentication stored securely in HTTP-only cookies

🚫 Protected routes using custom middleware

💾 MongoDB database connection with Mongoose

⚙️ Environment variable configuration with dotenv

🧹 Clean and modular folder structure

🧰 Tech Stack
Category Technology
Backend Node.js, Express.js
Database MongoDB (via Mongoose)
Authentication JWT + bcrypt
Environment Config dotenv
Cookie Handling cookie-parser
📁 Folder Structure
basic-auth-system/
│
├── config/
│ └── db.js # MongoDB connection logic
│
├── controllers/
│ └── auth.controller.js # Handles register, login, logout, profile
│
├── middleware/
│ └── auth.middleware.js # Auth middleware for protected routes
│
├── models/
│ └── user.model.js # Mongoose schema (User)
│
├── routes/
│ └── auth.routes.js # All /auth routes
│
├── .env # Environment variables
├── server.js # Main server entry point
└── package.json

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/buildwithdivyam/basic-auth-system.git
cd basic-auth-system

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create a .env file in the root folder and add:

MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
PORT=3000

4️⃣ Run the Server
npm start

Server will start on:
👉 http://localhost:3000

📬 API Endpoints
Method Endpoint Description Auth Required
POST /auth/register Register a new user ❌
POST /auth/login Login user and generate JWT cookie ❌
POST /auth/logout Logout and clear cookie ✅
POST /auth/profile Access profile (requires JWT cookie) ✅
Example Request (Register/Login)
{
"name": "John Doe",
"email": "john@example.com",
"password": "123456"
}

Example Response
{
"message": "Login Successfully!",
"user": {
"\_id": "64f2a4b1...",
"name": "John Doe",
"email": "john@example.com"
}
}

🧠 How It Works

Register: User data is validated → password hashed with bcrypt → stored in MongoDB.

Login: Password is verified → JWT token created and sent in an HTTP-only cookie.

Auth Middleware: Reads and verifies JWT from cookie → attaches user data to req.user.

Logout: Clears the cookie by setting an expired token.

🔐 Security Notes

Cookies are HTTP-only, preventing JavaScript access (XSS safe).

JWT tokens expire in 2 days by default.

Passwords are hashed with bcrypt before storage.

Use HTTPS in production to protect cookies.

🧪 Example .env File
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/test
JWT_SECRET=mysecretkey
NODE_ENV=development
PORT=3000

📦 Dependencies
npm install express mongoose dotenv bcrypt jsonwebtoken cookie-parser
