import db from "../config/db.js";

// Get all divisions
export const getDivisions = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT div_id, division_name FROM divisions WHERE delete_flg = 0"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
