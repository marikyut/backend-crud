import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Helper to generate token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const registerUser = (req, res) => {
  console.log("Registering user:", req.body);
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if email already exists
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Database select error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert new user
    const sql =
      "INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)";
    db.query(sql, [firstName, lastName, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Database insert error:", err);
        return res.status(500).json({ error: err.message });
      }

      const newUser = {
        id: result.insertId,
        firstName,
        lastName,
        email,
      };

      const token = generateToken(newUser);

      res.status(201).json({
        message: "User registered successfully",
        user: newUser,
        token,
      });
    });
  });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(401).json({ error: "Invalid email or password" });

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
      },
      token,
    });
  });
};
