import express from 'express'
import dotenv from 'dotenv'
import connectMongoDB from './config/database.js'
import { notFoundLink, error } from './middleware/errorHandlerMiddleware.js'
import benhnhanRoutes from './routes/benhnhanRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'

dotenv.config()
connectMongoDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/benh-nhan', benhnhanRoutes)
app.use('/api/tai-khoan', userRoutes)


app.use(notFoundLink)
app.use(error)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Running on ${PORT} by NTP`))