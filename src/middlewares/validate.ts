import { Request, Response, NextFunction } from 'express'
import { ZodError, ZodSchema } from 'zod'

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: 'Validation error',
          errors: error.errors.map((err) => ({
            path: err.path.join('.'),
          })),
        })
        return
      } else {
        res.status(400).json({ message: 'Validation error' })
        return
      }
    }
  }
}
