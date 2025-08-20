import express from "express";
import { getEmployees, createEmployee } from "../controllers/employeeController.js";

const router = express.Router();

// Get all employees
router.get("/", getEmployees);

// Post add new employee
router.post("/", createEmployee);

export default router;
