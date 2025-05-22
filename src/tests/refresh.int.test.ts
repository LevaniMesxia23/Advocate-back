import request from 'supertest'
import app from '../server'
import Admin from '../models/Admin'
import mongoose from 'mongoose'
import { generateRefreshToken, generateToken } from '../utils/jwt'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

let refreshToken: string

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL!)

  const password = await bcrypt.hash("test1234", 10)
  const admin = await Admin.create({
    email: "test@test.com",
    password,
  })

  refreshToken = jwt.sign({id: admin._id.toString()}, process.env.REFRESH_SECRET!, {expiresIn: "7d"})

  admin.refreshToken = refreshToken
  await admin.save()
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe("Auth Refresh Token Flow", () => {
  it('should refresh token successfully', async () => {
    const response = await request(app).post('/api/auth/refresh-token').set('Cookie', [`refreshToken=${refreshToken}`])
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Token refreshed successfully')
  })

  it('should return 401 if refresh token is missing', async () => {
    const response = await request(app).post('/api/auth/refresh-token')
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
  })

  it('should fail refresh if token is invalid', async () => {
    const response = await request(app).post('/api/auth/refresh-token').set('Cookie', [`refreshToken=invalid`])
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
  })

  it('should fail refresh if token does not match DB', async () => {
    const fakeToken = jwt.sign({id: new mongoose.Types.ObjectId().toString()}, process.env.REFRESH_SECRET!, {expiresIn: "7d"})
    const response = await request(app).post('/api/auth/refresh-token').set('Cookie', [`refreshToken=${fakeToken}`])
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
  })
})




