import express from 'express'
import { verifyUser } from '../controllers/userControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()


router.post('/dang-nhap', verifyUser, protect)


export default router