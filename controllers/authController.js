import ctrlWrapper from "../helpers/ctrlWrapper.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshTokens,
  loginWithApple,
} from "../services/authServices.js";

// ===== Classic register/login =====
const registerController = async (req, res) => {
  const newUser = await registerUser(req.body);
  res.status(201).json({ email: newUser.email, roles: newUser.roles });
};

const loginController = async (req, res) => {
  const { token, user } = await loginUser(req.body);
  res.json({ token, user });
};

const logoutController = async (req, res) => {
  await logoutUser(req.user);
  res.status(204).json();
};

const getCurrentController = async (req, res) => {
  const { email, roles } = req.user;
  res.json({ email, roles });
};

// ===== Apple Login =====
const appleLoginController = async (req, res) => {
  const { appleToken } = req.body;
  const { token, user } = await loginWithApple(appleToken);
  res.json({ token, user });
};

const refreshController = async (req, res) => {
  const { refreshToken } = req.body;
  const tokens = await refreshTokens(refreshToken);
  res.json(tokens);
};

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
  logoutController: ctrlWrapper(logoutController),
  getCurrentController: ctrlWrapper(getCurrentController),
  appleLoginController: ctrlWrapper(appleLoginController),
  refreshController: ctrlWrapper(refreshController),
};
