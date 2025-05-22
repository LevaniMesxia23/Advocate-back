import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import cors from 'cors'
import authRoutes from './routes/auth'
import carouselRoutes from './routes/carousel'
import contactRoutes from './routes/contact'
import teamRoutes from './routes/team'
import blogRoutes from './routes/blog'
import commentRoutes from './routes/comment'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/carousel', carouselRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/team', teamRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/comment', commentRoutes)
export default app;
