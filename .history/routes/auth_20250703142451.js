import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { db } from '../db.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username])

  if (rows.length === 0) return res.status(401).json({ message: 'User not found' })

  const user = rows[0]
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) return res.status(401).json({ message: 'Invalid password' })

  const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' })

  res.json({
    user: { id: user.id, username: user.username },
    token,
  })
})

export default router
