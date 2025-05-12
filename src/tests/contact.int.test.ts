import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import { createTestAdmin } from './utils/createTestAdmin'

let token: string

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL!)
  const admin = await createTestAdmin()
  token = admin.token
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Contact Api', () => {
  it('should allow guests to submit a contact form', async () => {
    const response = await request(app).post('/api/contact').send({
      name: 'John Doe',
      email: 'john@doe.com',
      phone: '1234567890',
      message: 'Hello, world!',
    })
    expect(response.status).toBe(201)
    expect(response.body.message).toBe('Message Sent')
  })

  it('should return paginated results', async () => {
    const response = await request(app)
      .get('/api/contact?page=1&limit=2')
      .set('Cookie', `token=${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(Array.isArray(response.body.data)).toBe(true)
  })

  it('should fail to submit with invalid email', async () => {
    const response = await request(app).post('/api/contact').send({
      name: 'Vinme Doe',
      email: 'invalid-email',
      phone: '1234567890',
      message: 'Hello, world!',
    })

    expect(response.status).toBe(400)
  })
})
