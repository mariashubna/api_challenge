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
  const { token, refreshToken, user } = await registerUser(req.body);
  res.status(201).json({
    token,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
    },
  });
};

const loginController = async (req, res) => {
  const { token, refreshToken, user } = await loginUser(req.body);
  res.json({
    token,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
    },
  });
};

const logoutController = async (req, res) => {
  await logoutUser(req.user);
  res.status(204).json();
};

const getCurrentController = async (req, res) => {
  const { id, email, name, roles } = req.user;
  res.json({ id, email, name, roles });
};

// ===== Apple Login =====
const appleLoginController = async (req, res) => {
  const { appleToken } = req.body;
  const { token, refreshToken, user } = await loginWithApple(appleToken);
  res.json({
    token,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
    },
  });
};

const refreshController = async (req, res) => {
  const { refreshToken } = req.body;
  const {
    token,
    refreshToken: newRefreshToken,
    user,
  } = await refreshTokens(refreshToken);
  res.json({
    token,
    refreshToken: newRefreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
    },
  });
};

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
  logoutController: ctrlWrapper(logoutController),
  getCurrentController: ctrlWrapper(getCurrentController),
  appleLoginController: ctrlWrapper(appleLoginController),
  refreshController: ctrlWrapper(refreshController),
};
