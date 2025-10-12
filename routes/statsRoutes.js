import express from "express";
import * as statsController from "../controllers/statsController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Get statistics for all user challenges
 *     tags:
 *       - Statistics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   challengeId:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Health Marathon"
 *                   totalDays:
 *                     type: integer
 *                     example: 7
 *                   completedDays:
 *                     type: integer
 *                     example: 4
 *                   progress:
 *                     type: integer
 *                     example: 57
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, statsController.getUserStats);

export default router;
