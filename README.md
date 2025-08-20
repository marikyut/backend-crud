# backend-crud

A simple Node.js backend CRUD application using Express, MySQL, JWT authentication, and bcrypt for password security.

## Features

- User registration and login with JWT authentication
- Secure password hashing with bcrypt
- Basic CRUD operations for users (Create, Read, Update, Delete)
- MySQL database integration

## Getting Started

### Prerequisites

- Node.js and npm installed
- MySQL server running

### Installation

1. Clone the repository:

2. Install dependencies:

3. Set up your MySQL database and update the connection settings in `db.js`.

### Running the App


The server will start on `http://localhost:3000`.

## API Endpoints

- `POST /login` — User login
- `POST /register` — User registration
- `GET /users` — Get all users (protected)
- `PUT /users/:id` — Update user (protected)
- `DELETE /users/:id` — Delete user (protected)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

## my table schema

-- USER TABLE
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','user') DEFAULT 'user'
);

-- DIVISION TABLE
CREATE TABLE divisions (
    div_id INT PRIMARY KEY AUTO_INCREMENT,
    division_name VARCHAR(100) NOT NULL,
    delete_flg TINYINT(1) DEFAULT 0
);

-- CLASS TABLE
CREATE TABLE classes (
    class_id INT PRIMARY KEY AUTO_INCREMENT,
    class_name VARCHAR(100) NOT NULL,
    div_id INT NOT NULL,
    delete_flg TINYINT(1) DEFAULT 0,
    FOREIGN KEY (div_id) REFERENCES divisions(div_id)
);

-- EMPLOYEE TABLE
CREATE TABLE employees (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    birthday DATE NOT NULL,
    division_id INT NOT NULL,
    class_id INT NOT NULL,
    delete_flg TINYINT(1) DEFAULT 0,
    FOREIGN KEY (division_id) REFERENCES divisions(div_id),
    FOREIGN KEY (class_id) REFERENCES classes(class_id)
);
