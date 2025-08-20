import db from "../config/db.js";
export const getEmployees = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT e.emp_id AS id,
             e.firstname,
             e.lastname,
             e.birthday,
             d.division_name AS division,
             c.class_name AS class
      FROM employees e
      JOIN divisions d ON e.division_id = d.div_id
      JOIN classes c ON e.class_id = c.class_id
      WHERE e.delete_flg = 0
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add new employee
export const createEmployee = async (req, res) => {
  try {
    const { firstname, lastname, birthday, division, class: classId } = req.body;

    if (!firstname || !lastname || !birthday || !division || !classId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [result] = await db.query(
      `INSERT INTO employees (firstname, lastname, birthday, division_id, class_id)
       VALUES (?, ?, ?, ?, ?)`,
      [firstname, lastname, birthday, division, classId]
    );

    // Return the created employee's ID
    res.status(201).json({ emp_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
