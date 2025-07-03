import express from 'express'
import { db } from '../db.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

//Get items for the logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
  const [items] = await db.execute('SELECT * FROM items WHERE user_id = ?', [req.user.id])
  res.json(items)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch items'})
  }
})

router.post('/', verifyToken, async (req, res) => {
  const { name } = req.body
  try {
  await db.execute('INSERT INTO items (name, user_id) VALUES (?, ?)', [name, req.user.id])
  res.sendStatus(201)
  } catch (error) {
   res.status(500).json({ message: 'Failed to create item'})
}
})

// Add update and delete similarly...

export default router
