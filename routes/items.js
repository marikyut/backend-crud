import express from 'express'
import { db } from '../db.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', verifyToken, async (req, res) => {
  const [rows] = await db.execute('SELECT * FROM items WHERE user_id = ?', [req.user.id])
  res.json(rows)
})

router.post('/', verifyToken, async (req, res) => {
  const { name } = req.body
  await db.execute('INSERT INTO items (name, user_id) VALUES (?, ?)', [name, req.user.id])
  res.sendStatus(201)
})

// Add update and delete similarly...

export default router
