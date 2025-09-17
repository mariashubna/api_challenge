import express from "express";
import authController from "../controllers/authController.js";
import {
  classicRegisterSchema,
  classicLoginSchema,
  appleLoginSchema,
  refreshSchema,
} from "../schemas/authSchema.js";

import validate from "../middlewares/validate.js";

import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

// Classic routes
router.post(
  "/register",
  validate(classicRegisterSchema),
  authController.registerController
);
router.post(
  "/login",
  validate(classicLoginSchema),
  authController.loginController
);

// Apple route
router.post(
  "/apple",
  validate(appleLoginSchema),
  authController.appleLoginController
);

// Logout and refresh
router.post("/logout", authenticate, authController.logoutController);
router.post(
  "/refresh",
  validate(refreshSchema),
  authController.refreshController
);

export default router;
