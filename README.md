# Backend User Management API

This project is a backend API for user management, built with Node.js, Express, and PostgreSQL.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (version 12 or higher)
- npm (usually comes with Node.js)
- PostgreSQL

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   DB_USER=your_database_user
   DB_HOST=your_database_host
   DB_NAME=your_database_name
   DB_PASSWORD=your_database_password
   DB_PORT=your_database_port
   ```

4. Set up the database:
   - Create a PostgreSQL database with the name specified in your `.env` file.
   - Run your database migration scripts (if any).

## Running the Application

To start the server in development mode:
```
npm run dev
```

To start the server in production mode:
```
npm start
```

## API Endpoints

### User Management

- **GET /users**: Retrieve all users.
- **GET /users/:id**: Retrieve a user by ID.
- **POST /users**: Create a new user.
- **PUT /users/:id**: Update a user by ID.
- **DELETE /users/:id**: Delete a user by ID.# inl-backend1
