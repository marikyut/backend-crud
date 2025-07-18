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