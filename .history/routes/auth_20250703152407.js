import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../db.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    // Find user by username
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username])
    const user = rows[0]

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    // Compare hashed password
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', {
      expiresIn: '1h',
    })

    res.json({
      user: {
        id: user.id,
        username: user.username,
      },
      token,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Login failed' })
  }
})

export default router


