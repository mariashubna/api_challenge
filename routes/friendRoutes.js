import express from "express";
import * as friendController from "../controllers/friendController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /friends:
 *   post:
 *     summary: Send a friend request
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Friend request data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiverId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Friend request sent
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, friendController.sendFriendRequest);

/**
 * @swagger
 * /friends:
 *   get:
 *     summary: Get all friends of the user
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of friends
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, friendController.getFriends);

export default router;
