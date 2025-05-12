import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(9).max(10),
  message: z.string().min(1),
})
