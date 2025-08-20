import db from "../config/db.js";

// Get all classes
export const getClasses = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT class_id, class_name, div_id FROM classes WHERE delete_flg = 0"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
