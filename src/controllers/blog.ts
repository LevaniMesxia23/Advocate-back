import { Request, Response } from 'express'
import Blog from '../models/Blog'
import { blogSchema, blogUpdateSchema } from '../validators/blog'
import slugify from 'slugify'
interface BlogFilters {
  category?: string
  tags?: {
    $in: string[]
  }
  search?: {
    $search: string
  }
  page?: number
  limit?: number
}

export const createBlog = async (req: Request, res: Response) => {
  const slug = slugify(req.body.title, { lower: true, strict: true })
  const exists = await Blog.findOne({ slug })
  if (exists) {
    res.status(400).json({ error: 'Blog already exists' })
    return
  }
  const blog = await Blog.create({ ...req.body, slug })
  res.status(201).json(blog)
}

export const getAllBlogs = async (req: Request, res: Response) => {
  const { category, tags, search, page = 1, limit = 6 } = req.query
  const filters: BlogFilters = {}
  if (category) filters.category = category as string
  if (tags) filters.tags = { $in: (tags as string).split(',') }
  if (search) filters.search = { $search: search as string }
  
  const skip = (Number(page) - 1) * Number(limit)
  const [blogs, total] = await Promise.all([
    Blog.find(filters).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Blog.countDocuments(filters),
  ])
  res.status(200).json({
    page: Number(page),
    total,
    totalPages: Math.ceil(total / Number(limit)),
    data: blogs,
  })
}

export const getBlogBySlug = async (req: Request, res: Response) => {
  const blog = await Blog.findOne({slug: req.params.slug})
  if(!blog){
    res.status(404).json({error: 'Blog not found'})
    return
  }
  res.status(200).json(blog)
}

export const updateBlog = async (req: Request, res: Response) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true})
  if(!blog){
    res.status(404).json({error: 'Blog not found'})
    return
  }
  res.status(200).json(blog)
}

export const deleteBlog = async (req: Request, res: Response) => {
  const blog = await Blog.findByIdAndDelete(req.params.id)
  if(!blog){
    res.status(404).json({error: 'Blog not found'})
    return
  }
  res.status(200).json({message: 'Blog deleted successfully'})
}

