import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import Admin from '../models/Admin'
import { generateRefreshToken, generateToken } from '../utils/jwt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const existingAdmin = await Admin.findOne({ email })
  if (existingAdmin) {
    res.status(400).json({
      message: 'Admin already exists',
    })
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const admin = await Admin.create({
    email,
    password: hashedPassword,
  })

  const accessToken = generateToken(admin._id.toString())
  const refreshToken = generateRefreshToken(admin._id.toString())
  
  admin.refreshToken = refreshToken
  await admin.save()

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax',
  })
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax',
  })

  res.status(201).json({
    message: 'Admin registered successfully',
  })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const admin = await Admin.findOne({ email })
  if (!admin) {
    res.status(400).json({
      message: 'Invalid credentials',
    })
    return
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password)
  if (!isPasswordValid) {
    res.status(400).json({
      message: 'Invalid credentials',
    })
    return
  }

  const accessToken = generateToken(admin._id.toString())
  const refreshToken = generateRefreshToken(admin._id.toString())

  admin.refreshToken = refreshToken
  await admin.save()

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax',
  })

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax',
  })

  res.status(200).json({
    message: 'Admin logged in successfully',
  })
}

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) {
    res.status(401).json({
      message: 'Unauthorized',
    })
    return
  }

  let payload: any
  try {
    payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET!)
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized',
    })
    return
  }

  const admin = await Admin.findById(payload.id)
  if (!admin || admin.refreshToken !== refreshToken) {
    res.status(401).json({
      message: 'Unauthorized',
    })
    return
  }

  const newAccessToken = generateToken(admin._id.toString())
  res.cookie('accessToken', newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax',
  })

  res.status(200).json({
    message: 'Token refreshed successfully',
  })
}