import express from 'express'
import { createHoso, getHoso, updateHoso, getHosoById, deleteHoso} from '../controllers/hosobenhnhanController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/').get(getHoso).post(protect, createHoso)
router.route('/:id').get(getHosoById).put(protect, updateHoso).delete(protect, deleteHoso)

export default router