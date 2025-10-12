import express from "express";
import * as challengeController from "../controllers/challengeController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /challenges:
 *   post:
 *     summary: Create a new challenge
 *     tags:
 *       - Challenges
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Challenge data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Health Marathon"
 *               duration:
 *                 type: integer
 *                 example: 7
 *               color:
 *                 type: string
 *                 example: "#FF0000"
 *     responses:
 *       201:
 *         description: Challenge created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, challengeController.createChallenge);

/**
 * @swagger
 * /challenges:
 *   get:
 *     summary: Get all challenges of the user
 *     tags:
 *       - Challenges
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of challenges
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   duration:
 *                     type: integer
 *                   color:
 *                     type: string
 *                   isCompleted:
 *                     type: boolean
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, challengeController.getChallenges);

export default router;
