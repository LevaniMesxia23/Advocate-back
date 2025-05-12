import { Request, Response } from 'express'
import Contact from '../models/Contact'

export const createContact = async (req: Request, res: Response) => {
  const contact = await Contact.create(req.body)
  res.status(201).json({
    message: 'Message Sent',
    data: contact,
  })
}

export const getAllContacts = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  const [messages, total] = await Promise.all([
    Contact.find().skip(skip).limit(limit),
    Contact.countDocuments(),
  ])

  res.status(200).json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: messages,
  })
}