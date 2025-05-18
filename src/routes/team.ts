import { Router } from "express"
import { createTeam, deleteTeam, getAllTeams, getSingleTeam, updateTeam } from "../controllers/team"
import { teamSchema } from "../validators/team"
import { validate } from "../middlewares/validate"
import { requireAdmin } from "../middlewares/auth"

const router = Router()

/**
 * @swagger
 * /api/team:
 *   get:
 *     summary: Get all team members
 *     tags:
 *       - Team
 *     responses:
 *       200:
 *         description: List of all team members
 *   post:
 *     summary: Create a new team member
 *     tags:
 *       - Team
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position
 *               - subheading
 *               - email
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *               position:
 *                 type: string
 *                 minLength: 1
 *               subheading:
 *                 type: string
 *                 minLength: 1
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               linkedin:
 *                 type: string
 *                 format: url
 *               bio:
 *                 type: string
 *               services:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *                 format: url
 *     responses:
 *       201:
 *         description: Team member created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 * 
 * /api/team/{id}:
 *   get:
 *     summary: Get a single team member
 *     tags:
 *       - Team
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team member details
 *       404:
 *         description: Team member not found
 *   put:
 *     summary: Update a team member
 *     tags:
 *       - Team
 *     security:
 *       - cookieAuth: []
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
 *             type: object
 *             required:
 *               - name
 *               - position
 *               - subheading
 *               - email
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *               position:
 *                 type: string
 *                 minLength: 1
 *               subheading:
 *                 type: string
 *                 minLength: 1
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               linkedin:
 *                 type: string
 *                 format: url
 *               bio:
 *                 type: string
 *               services:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *                 format: url
 *     responses:
 *       200:
 *         description: Team member updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Team member not found
 *   delete:
 *     summary: Delete a team member
 *     tags:
 *       - Team
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team member deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Team member not found
 */
router.get("/", getAllTeams)
router.get("/:id", getSingleTeam)
router.post("/", requireAdmin, validate(teamSchema), createTeam)
router.put("/:id", requireAdmin, validate(teamSchema), updateTeam)
router.delete("/:id", requireAdmin, deleteTeam)

export default router