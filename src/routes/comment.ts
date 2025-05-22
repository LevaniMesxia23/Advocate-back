import { Router } from 'express'
import { createComment, getCommentsByBlogId, deleteComment } from '../controllers/comment'
import { validate } from '../middlewares/validate'
import { commentSchema } from '../validators/comment'
import { requireAdmin } from '../middlewares/auth'
const router = Router()

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management API
 */

/**
 * @swagger
 * /api/comment/{blogId}:
 *   get:
 *     summary: Get all comments for a blog
 *     tags: [Comments]
 *     description: Retrieve all comments for a specific blog post
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog ID
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   blogId:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   content:
 *                     type: string
 *                   parentId:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   replies:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Comment'
 */
router.get('/:blogId', getCommentsByBlogId)

/**
 * @swagger
 * /api/comment/{blogId}:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     description: Create a new comment for a blog post
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - content
 *             properties:
 *               name:
 *                 type: string
 *                 description: Commenter's name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Commenter's email (optional)
 *               content:
 *                 type: string
 *                 description: Comment content
 *               parentId:
 *                 type: string
 *                 description: Parent comment ID (for replies, optional)
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid input data
 */
router.post('/:blogId', validate(commentSchema), createComment)

/**
 * @swagger
 * /api/comment/delete/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     description: Delete a comment and all its replies (admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       401:
 *         description: Unauthorized - admin access required
 */
router.delete('/delete/:commentId', requireAdmin, deleteComment)

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - blogId
 *         - name
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated comment ID
 *         blogId:
 *           type: string
 *           description: ID of the blog this comment belongs to
 *         name:
 *           type: string
 *           description: Commenter's name
 *         email:
 *           type: string
 *           format: email
 *           description: Commenter's email (optional)
 *         content:
 *           type: string
 *           description: Comment content
 *         parentId:
 *           type: string
 *           description: Parent comment ID (for replies, optional)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Comment creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Comment last update timestamp
 */

export default router
