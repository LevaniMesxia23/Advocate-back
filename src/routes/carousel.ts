import { Router } from 'express'
import { requireAdmin } from '../middlewares/auth'
import { validate } from '../middlewares/validate'
import { carouselSchema } from '../validators/carousel'
import { createCarousel, deleteCarousel, getAllCarousel, updateCarousel } from '../controllers/carousel'

const router = Router()

router.get('/', getAllCarousel)

router.post('/', requireAdmin, validate(carouselSchema),createCarousel)
router.put('/:id', requireAdmin, validate(carouselSchema), updateCarousel)
router.delete('/:id', requireAdmin, deleteCarousel)

export default router

/**
 * @swagger
 * /api/carousel:
 *   get:
 *     summary: Get all carousel items
 *     tags: [Carousel]
 *     responses:
 *       200:
 *         description: List of carousel items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Carousel'
 *   post:
 *     summary: Create a new carousel item
 *     tags: [Carousel]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarouselInput'
 *     responses:
 *       201:
 *         description: Created carousel item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carousel'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 * 
 * /api/carousel/{id}:
 *   put:
 *     summary: Update a carousel item
 *     tags: [Carousel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarouselInput'
 *     responses:
 *       200:
 *         description: Updated carousel item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carousel'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Carousel not found
 *   delete:
 *     summary: Delete a carousel item
 *     tags: [Carousel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Carousel not found
 * 
 * components:
 *   schemas:
 *     Carousel:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         subtitle:
 *           type: string
 *         image:
 *           type: string
 *           format: uri
 *         link1:
 *           type: string
 *           format: uri
 *         link2:
 *           type: string
 *           format: uri
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CarouselInput:
 *       type: object
 *       required:
 *         - title
 *         - subtitle
 *         - image
 *       properties:
 *         title:
 *           type: string
 *         subtitle:
 *           type: string
 *         image:
 *           type: string
 *           format: uri
 *         link1:
 *           type: string
 *           format: uri
 *         link2:
 *           type: string
 *           format: uri
 */
