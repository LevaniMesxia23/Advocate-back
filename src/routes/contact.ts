import { Router } from 'express'
import { createContact, getAllContacts } from '../controllers/contact'
import { requireAdmin } from '../middlewares/auth'
import { validate } from '../middlewares/validate'
import { contactSchema } from '../validators/Contact'

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - message
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *           minLength: 9
 *           maxLength: 10
 *         message:
 *           type: string
 *           minLength: 1
 * 
 * /api/contact:
 *   get:
 *     summary: Get all contact messages
 *     description: Retrieve a list of all contact form submissions (admin only)
 *     tags: [Contact]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of contact messages
 *       401:
 *         description: Unauthorized - invalid or missing token
 *   post:
 *     summary: Submit a contact form
 *     description: Send a new contact message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/', validate(contactSchema), createContact)
router.get('/', requireAdmin, getAllContacts)

export default router
