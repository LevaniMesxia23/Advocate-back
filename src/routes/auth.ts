import { Router } from 'express'
import { register, login, refreshToken } from '../controllers/auth'
import { validate } from '../middlewares/validate'
import { registerSchema, loginSchema } from '../validators/auth'

const router = Router()
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       '201':
 *         description: Admin registered successfully
 *       '400':
 *         description: Bad Request
 */

router.post('/register', validate(registerSchema), register)
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login an admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       '200':
 *         description: Admin logged in successfully
 *       '400':
 *         description: Invalid credentials
 */

router.post('/login', validate(loginSchema), login)
/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     description: Uses refresh token from cookies to generate a new access token
 *     responses:
 *       '200':
 *         description: Token refreshed successfully
 *       '401':
 *         description: Unauthorized - Invalid or missing refresh token
 */
router.post('/refresh-token', refreshToken)

export default router
