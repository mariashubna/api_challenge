import express from "express";
import * as inviteController from "../controllers/inviteController.js";
import authenticate from "../middlewares/authenticate.js";

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
router.post("/", authenticate, inviteController.sendInvite);

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
router.get("/", authenticate, inviteController.getUserInvites);

/**
 * @swagger
 * /invites/sent:
 *   get:
 *     summary: Get sent invites
 *     tags:
 *       - Invites
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of sent invites
 *       401:
 *         description: Unauthorized
 */

// Просмотр отправленных приглашений
router.get("/sent", authenticate, inviteController.getSentInvites);

/**
 * @swagger
 * /invites/{id}/accept:
 *   patch:
 *     summary: Accept an invite
 *     tags:
 *       - Invites
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the invite
 *     responses:
 *       200:
 *         description: Invite accepted
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Invite not found
 */

// Принять приглашение
router.patch("/:id/accept", authenticate, inviteController.acceptInvite);

/**
 * @swagger
 * /invites/{id}:
 *   delete:
 *     summary: Delete an invite
 *     tags:
 *       - Invites
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the invite
 *     responses:
 *       200:
 *         description: Invite deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Invite not found
 */

// Удалить приглашение
router.delete("/:id", authenticate, inviteController.deleteInvite);

export default router;
