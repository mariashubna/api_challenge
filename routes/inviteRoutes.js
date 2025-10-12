import express from "express";
import * as inviteController from "../controllers/inviteController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /invites:
 *   post:
 *     summary: Send a challenge invite
 *     tags:
 *       - Invites
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Invite data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               toUserId:
 *                 type: integer
 *                 example: 2
 *               challengeId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Invite sent successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, inviteController.sendInvite);

/**
 * @swagger
 * /invites:
 *   get:
 *     summary: Get all invites for the user
 *     tags:
 *       - Invites
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of invites
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, inviteController.getUserInvites);

export default router;
