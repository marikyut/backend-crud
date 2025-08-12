import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'



const app = express();

//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/auth', authRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})
