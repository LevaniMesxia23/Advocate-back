import request from "supertest"
import app from "../server"
import Team from "../models/Team"
import mongoose from "mongoose"
import { createTestAdmin } from "./utils/createTestAdmin"
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

describe('Team API', () => {
  let memberId: string
  
  it('should create a new team member', async () => {
    const res = (await request(app).post('/api/team').set('Cookie', `token=${token}`).send({ 
      name: "John Doe",
      position: "Developer",
      subheading: "Developer",
      email: "john@doe.com",
      phone: "1234567890",
      linkedin: "https://www.linkedin.com/in/john-doe",
      bio: "John Doe is a developer",
      services: ["Web Development", "Mobile Development"],
      image: "https://example.com/image.jpg"
    }))

    expect(res.status).toBe(201)
    expect(res.body.name).toBe("John Doe")
    memberId = res.body._id
  })

  it('should get all team members', async () => {
    const res = await request(app).get('/api/team').set('Cookie', `token=${token}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('should get a single team member', async () => {
    const res = await request(app).get(`/api/team/${memberId}`).set('Cookie', `token=${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty("name")
  })

  it('should update a team member', async () => {
    const res = await request(app)
      .put(`/api/team/${memberId}`)
      .set('Cookie', `token=${token}`)
      .send({
        name: "Updated Name",
        position: "Updated Position",
        subheading: "Updated Subheading",
        email: "updated@email.com",
        phone: "12345678900",
        linkedin: "https://www.linkedin.com/in/updated-name",
        bio: "Updated Bio",
        services: ["Updated Service 1", "Updated Service 2"],
        image: "https://example.com/updated-image.jpg"
      })
    
    expect(res.status).toBe(200)
    expect(res.body.name).toBe("Updated Name")
    expect(res.body.position).toBe("Updated Position")
    expect(res.body.subheading).toBe("Updated Subheading")
    expect(res.body.email).toBe("updated@email.com")
    expect(res.body.phone).toBe("12345678900")
    expect(res.body.linkedin).toBe("https://www.linkedin.com/in/updated-name")
    expect(res.body.bio).toBe("Updated Bio")
  })

  it('Should delete a team member', async () => {
    const res = await request(app).delete(`/api/team/${memberId}`).set('Cookie', `token=${token}`)
    expect(res.status).toBe(200)
  })
  
})