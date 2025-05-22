import request from 'supertest'
import app from '../server'
import Blog from '../models/Blog'
import mongoose from 'mongoose'
import { createTestAdmin } from './utils/createTestAdmin'


let blogId: string
let token: string
let slug: string

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL!)
  const res = await createTestAdmin()
  token = res.token
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Blog API', () => {
  it('should create a blog', async () => {
    const res = await request(app).post('/api/blog').set('Cookie', `token=${token}`).send({
      title: 'Test Blog',
      category: 'Test Category',
      content: 'This is a test blog',
      author: 'Test Author',
      tags: ['test', 'blog'],
      images: ['https://example.com/image.jpg'],
      socialLinks: ['https://twitter.com/test'],
      lawWays: 'Test law ways'
    })
    expect(res.status).toBe(201)
    expect(res.body.title).toBe('Test Blog')
    blogId = res.body._id
    slug = res.body.slug
  })

  it('should get all blogs', async () => {
    const res = await request(app).get('/api/blog')
    expect(res.status).toBe(200)
    expect(res.body.data.length).toBe(1)
  })

  it('should get a blog by slug', async () => {
    const res = await request(app).get(`/api/blog/${slug}`)
    expect(res.status).toBe(200)
    expect(res.body.title).toBe('Test Blog')
  })

  it('should get a blog with navigation', async () => {
    const res = await request(app).get(`/api/blog/with-nav/${slug}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('current')
    expect(res.body).toHaveProperty('previous')
    expect(res.body).toHaveProperty('next')

  })

  it('should update a blog', async () => {
    const res = await request(app).put(`/api/blog/${blogId}`).set('Cookie', `token=${token}`).send({
      title: 'Updated Blog',
    })
    expect(res.status).toBe(200)
    expect(res.body.title).toBe('Updated Blog')
  })

  it('should delete a blog', async () => {
    const res = await request(app).delete(`/api/blog/${blogId}`).set('Cookie', `token=${token}`)
    expect(res.status).toBe(200)
  })
})




