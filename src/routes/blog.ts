import { Router } from 'express'
import { createBlog, getAllBlogs, getBlogBySlug, updateBlog, deleteBlog } from '../controllers/blog'
import { validate } from '../middlewares/validate'
import { blogSchema, blogUpdateSchema } from '../validators/blog'
import { requireAdmin } from '../middlewares/auth'
const router = Router()

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog management API
 */

/**
 * @swagger
 * /api/blog:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     description: Retrieve a list of all blogs with optional filtering
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter blogs by category
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: Filter blogs by tags (comma separated)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search blogs by title or content
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 6
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Blog'
 */
router.get('/', getAllBlogs)

/**
 * @swagger
 * /api/blog/{slug}:
 *   get:
 *     summary: Get a blog by slug
 *     tags: [Blogs]
 *     description: Retrieve a single blog by its slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog slug
 *     responses:
 *       200:
 *         description: Blog details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 */
router.get('/:slug', getBlogBySlug)

/**
 * @swagger
 * /api/blog:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     description: Create a new blog (admin only)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogInput'
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Invalid input or blog already exists
 *       401:
 *         description: Unauthorized
 */
router.post('/', requireAdmin, validate(blogSchema), createBlog)

/**
 * @swagger
 * /api/blog/{id}:
 *   put:
 *     summary: Update a blog
 *     tags: [Blogs]
 *     description: Update an existing blog (admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogUpdateInput'
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', requireAdmin, validate(blogUpdateSchema), updateBlog)

/**
 * @swagger
 * /api/blog/{id}:
 *   delete:
 *     summary: Delete a blog
 *     tags: [Blogs]
 *     description: Delete a blog (admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog ID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', requireAdmin, deleteBlog)

/**
 * @swagger
 * components:
 *   schemas:
 *     BlogInput:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - category
 *         - author
 *         - lawWays
 *       properties:
 *         title:
 *           type: string
 *           minLength: 3
 *           description: The blog title
 *         content:
 *           type: string
 *           minLength: 10
 *           description: The blog content
 *         category:
 *           type: string
 *           minLength: 3
 *           description: The blog category
 *         author:
 *           type: string
 *           description: The blog author
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs
 *         subtitle:
 *           type: string
 *           description: The blog subtitle
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of tags
 *         socialLinks:
 *           type: array
 *           items:
 *             type: string
 *             format: url
 *           description: Array of social media links
 *         lawWays:
 *           type: string
 *           description: Legal information
 *     
 *     BlogUpdateInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The blog title
 *         content:
 *           type: string
 *           description: The blog content
 *         category:
 *           type: string
 *           description: The blog category
 *         author:
 *           type: string
 *           description: The blog author
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs
 *         subtitle:
 *           type: string
 *           description: The blog subtitle
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of tags
 *         socialLinks:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of social media links
 *         lawWays:
 *           type: string
 *           description: Legal information
 *     
 *     Blog:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The blog ID
 *         title:
 *           type: string
 *           description: The blog title
 *         slug:
 *           type: string
 *           description: The blog slug
 *         category:
 *           type: string
 *           description: The blog category
 *         author:
 *           type: string
 *           description: The blog author
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of tags
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs
 *         socialLinks:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of social media links
 *         content:
 *           type: string
 *           description: The blog content
 *         lawWays:
 *           type: string
 *           description: Legal information
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *   
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 */

export default router
