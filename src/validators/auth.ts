import zod from 'zod'

export const registerSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
})
export const loginSchema = registerSchema
