import express from "express";
import * as complaintController from "../controllers/complaintController.js";
import authenticate from "../middlewares/authenticate.js";
import checkRole from "../middlewares/checkRole.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Complaints
 *   description: Жалобы пользователей
 */

/**
 * @swagger
 * /complaints:
 *   post:
 *     summary: Создать жалобу
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               complaintText:
 *                 type: string
 *                 description: Текст жалобы
 *             required:
 *               - complaintText
 *     responses:
 *       201:
 *         description: Жалоба создана
 *       400:
 *         description: Поле complaintText обязательно
 *       401:
 *         description: Неавторизован
 */
router.post("/", authenticate, complaintController.createComplaint);

/**
 * @swagger
 * /complaints:
 *   get:
 *     summary: Получить все жалобы (только админ/суперадмин)
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список жалоб
 *       401:
 *         description: Неавторизован
 *       403:
 *         description: Нет прав
 */
router.get(
  "/",
  authenticate,
  checkRole("admin", "superadmin"),
  complaintController.getAllComplaints
);

/**
 * @swagger
 * /complaints/{id}:
 *   get:
 *     summary: Получить жалобу по ID (только админ/суперадмин)
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID жалобы
 *     responses:
 *       200:
 *         description: Жалоба
 *       401:
 *         description: Неавторизован
 *       403:
 *         description: Нет прав
 *       404:
 *         description: Жалоба не найдена
 */
router.get(
  "/:id",
  authenticate,
  checkRole("admin", "superadmin"),
  complaintController.getComplaintById
);

/**
 * @swagger
 * /complaints/{id}/respond:
 *   put:
 *     summary: Ответить на жалобу (только админ/суперадмин)
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID жалобы
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               responseText:
 *                 type: string
 *                 description: Ответ администратора
 *             required:
 *               - responseText
 *     responses:
 *       200:
 *         description: Жалоба обновлена
 *       401:
 *         description: Неавторизован
 *       403:
 *         description: Нет прав
 *       404:
 *         description: Жалоба не найдена
 */
router.put(
  "/:id/respond",
  authenticate,
  checkRole("admin", "superadmin"),
  complaintController.respondToComplaint
);

export default router;
