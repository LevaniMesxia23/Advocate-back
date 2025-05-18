import {z} from 'zod'

export const blogSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  category: z.string().min(3),
  author: z.string().min(1),
  images: z.array(z.string()).min(1).optional(),
  subtitle: z.string().optional(),
  tags: z.array(z.string()).min(1).optional(),
  socialLinks: z.array(z.string().url()).optional(),
  lawWays: z.string().min(1),
})

export const blogUpdateSchema = blogSchema.partial()