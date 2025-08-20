import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import employeeRoutes from './routes/employeeRoutes.js';
import classRoutes from './routes/classRoutes.js';
import divisionRoutes from './routes/divisionRoutes.js';



const app = express();

//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/classes', classRoutes)
app.use('/api/divisions', divisionRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})
