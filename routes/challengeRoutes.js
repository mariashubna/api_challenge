import express from "express";
import * as challengeController from "../controllers/challengeController.js";
import authMiddleware from "../middlewares/authenticate.js";

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

/**
 * @swagger
 * /challenges/completed:
 *   get:
 *     summary: Get all completed challenges
 *     tags:
 *       - Challenges
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of completed challenges
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Challenge'
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/completed",
  authMiddleware,
  challengeController.getCompletedChallenges
);

/**
 * @swagger
 * /challenges/pending:
 *   get:
 *     summary: Get all pending (not completed) challenges
 *     tags:
 *       - Challenges
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending challenges
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Challenge'
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/pending",
  authMiddleware,
  challengeController.getPendingChallenges
);

router.get("/:id", authMiddleware, challengeController.getChallengeById);

/**
 * @swagger
 * /challenges/{id}:
 *   get:
 *     summary: Get a challenge by ID
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Challenge ID
 *     responses:
 *       200:
 *         description: Challenge data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Challenge'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Challenge not found
 *
 *   delete:
 *     summary: Delete a challenge
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Challenge ID
 *     responses:
 *       204:
 *         description: Challenge deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Challenge not found
 */

router.patch("/:id", authMiddleware, challengeController.updateChallenge);
/**
 * @swagger
 * /challenges/{id}:
 *   patch:
 *     summary: Update a challenge partially
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Challenge ID
 *     requestBody:
 *       description: Fields to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Challenge Name"
 *               color:
 *                 type: string
 *                 example: "#00FF00"
 *               isCompleted:
 *                 type: boolean
 *                 example: true
 *               duration:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Challenge updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Challenge'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Challenge not found
 */

router.delete("/:id", authMiddleware, challengeController.deleteChallenge);

export default router;
