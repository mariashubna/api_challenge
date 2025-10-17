import express from "express";
import * as friendController from "../controllers/friendController.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

/**
 * @swagger
 * /friends/requests:
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
router.post("/requests", authenticate, friendController.sendFriendRequest);

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
router.get("/", authenticate, friendController.getFriends);

/**
 * @swagger
 * /friends/requests/received:
 *   get:
 *     summary: Get received friend requests
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of received friend requests
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/requests/received",
  authenticate,
  friendController.getReceivedRequests
);

/**
 * @swagger
 * /friends/requests/sent:
 *   get:
 *     summary: Get sent friend requests
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of sent friend requests
 *       401:
 *         description: Unauthorized
 */
router.get("/requests/sent", authenticate, friendController.getSentRequests);

/**
 * @swagger
 * /friends/requests/{id}/accept:
 *   patch:
 *     summary: Accept a friend request
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the friend request
 *     responses:
 *       200:
 *         description: Friend request accepted
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Friend request not found
 */
router.patch(
  "/requests/:id/accept",
  authenticate,
  friendController.acceptFriendRequest
);

/**
 * @swagger
 * /friends/requests/{id}/reject:
 *   patch:
 *     summary: Reject a friend request
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the friend request
 *     responses:
 *       200:
 *         description: Friend request rejected
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Friend request not found
 */
router.patch(
  "/requests/:id/reject",
  authenticate,
  friendController.rejectFriendRequest
);

/**
 * @swagger
 * /friends/{id}:
 *   delete:
 *     summary: Remove a friend
 *     tags:
 *       - Friends
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the friend to remove
 *     responses:
 *       200:
 *         description: Friend removed
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Friend not found
 */
router.delete("/:id", authenticate, friendController.removeFriend);

export default router;
