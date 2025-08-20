// createAdmin.js
import bcrypt from "bcrypt";
import db from "./config/db.js"; // adjust the path to your db.js
import readline from "readline";

// Create readline interface for terminal input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

const createAdmin = async () => {
  try {
    const email = await askQuestion("Enter admin email: ");
    const plainPassword = await askQuestion("Enter admin password: ");
    const role = "admin";

    // Hash password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Check if email already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) {
        console.error("❌ Error checking user:", err);
        rl.close();
        process.exit(1);
      }

      if (results.length > 0) {
        console.log("⚠️ Admin with this email already exists.");
        rl.close();
        process.exit(0);
      }

      // Insert admin
      const sql =
        "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";
      db.query(sql, [email, hashedPassword, role], (err, result) => {
        if (err) {
          console.error("❌ Error inserting admin:", err);
          rl.close();
          process.exit(1);
        }
        console.log(`✅ Admin created successfully (ID: ${result.insertId})`);
        rl.close();
        process.exit(0);
      });
    });
  } catch (err) {
    console.error("❌ Error:", err);
    rl.close();
    process.exit(1);
  }
};

createAdmin();
