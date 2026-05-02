# International Payments Portal

## Overview

This project is a secure international payments portal developed for an internal banking system. Customers can register and log in to the portal securely. The application focuses on security best practices such as password hashing, JWT authentication, input validation, and environment variable protection.

The system is built using a modern web stack with a React frontend, Node.js and Express backend, and a MySQL database.

---

# Tech Stack

**Frontend**

* React
* Vite

**Backend**

* Node.js
* Express

**Database**

* MySQL

**Security**

* bcrypt (password hashing)
* JSON Web Tokens (JWT)
* RegEx input validation
* dotenv for environment variables

---

# Project Structure

```
project-root
│
├── backend
│   ├── server.js
│   ├── routes
│   ├── services
│   ├── .env.example
│
├── frontend
│   ├── src
│
├── README.md
├── .gitignore
```

---

# Installation Guide

## 1. Clone the Repository

```
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```

---

# Install Dependencies

## Backend

Navigate to the backend folder and install dependencies:

```
cd backend
npm install
```

## Frontend

Navigate to the frontend folder and install dependencies:

```
cd frontend
npm install
```

---

# Environment Variables

The project uses environment variables for database credentials and security keys.

The repository contains a template file called `.env.example`.

You must rename this file to `.env`.

```
.env.example → .env
```

After renaming, edit the `.env` file and insert your own configuration values.

Example `.env` file:

```
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=international_payments
PORT=5000
SECRET_KEY=your_secret_key_here
```

Important:
The real `.env` file is not included in the repository because it contains sensitive information.

---

# Database Setup

Open MySQL and run the following commands.

## Create the database

```
CREATE DATABASE international_payments;
```

## Use the database

```
USE international_payments;
```

## Create the users table

```
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Full_name VARCHAR(225) NOT NULL UNIQUE,
  id_number INT NOT NULL UNIQUE,
  account_number INT NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
```

You can confirm the table structure with:

```
DESCRIBE users;
```

## Create the transactions table

```
CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  payment_amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  provider VARCHAR(50) NOT NULL,
  payee_account_number VARCHAR(50) NOT NULL,
  swift_code VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
After creation of the above tables
/////NEW COLUMN ADDED TO THE transactions tables
run this sql code 
```

ALTER TABLE transactions 
ADD column user_id INT NOT NULL,
ADD CONSTRAINT fk_transactions_users
FOREIGN KEY (user_id) REFERENCES users(id);

```
TESTING THE SONAR KEY

You can confirm the table structure with:

```
DESCRIBE transactions;
```

# Running the Application

## Start the Backend Server

Navigate to the backend folder and run:

```
nodemon server.js
```

The backend server will run on:

```
http://localhost:5000
```

---

## Start the Frontend

Navigate to the frontend folder and run:

```
npm run dev
```

The frontend application will run on:

```
http://localhost:5173
```

---

# Application Flow

1. A customer registers using the signup page.
2. The backend hashes the password using bcrypt.
3. The user data is stored securely in the MySQL database.
4. The customer logs in using their credentials.
5. The backend verifies the password and returns a JWT token.
6. The token is used for authenticated requests.

---

# Security Features

* Password hashing using bcrypt
* JWT authentication
* Input validation using RegEx
* Sensitive configuration stored in environment variables
* `.env` excluded from GitHub using `.gitignore`

---

# Development Notes

* Do not upload `.env` to GitHub.
* Always use `.env.example` as the template.
* Ensure MySQL is running before starting the backend server.

---

# Authors

International Payments Portal
Group Development Project
//person four can take over
