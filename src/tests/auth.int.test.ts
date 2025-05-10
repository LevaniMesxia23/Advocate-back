import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL!)
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe("Auth API", () => {
  const testEmail = 'test@test.com'
  const testPassword = 'test1234'
  
  it("should register a new admin", async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: testEmail,
      password: testPassword,
    })
    expect(response.status).toBe(201)
    expect(response.body.message).toBe('Admin registered successfully')
  })

  it("should login an admin", async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: testEmail,
      password: testPassword,
    })
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Admin logged in successfully')
  })

  it("should not register an admin with an existing email", async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: testEmail,
      password: 'wrongpassword',
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Admin already exists')
  })
})