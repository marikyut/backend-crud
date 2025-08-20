import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
});

// Test connection
try {
  console.log("Database connected");
} catch (err) {
  console.error("Database connection failed:", err);
  process.exit(1);
}

export default db;
