import Admin from '../../models/Admin'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const createTestAdmin = async () => {
  const password = await bcrypt.hash('testpassword', 10)
  const admin = await Admin.create({ email: 'test@test.com', password })
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, { expiresIn: '1h' })
  return {admin, token}
}
