import * as userService from "../services/userService.js";

// ───────────────────────────────
// Получить всех пользователей с ролью "user"
// ───────────────────────────────
export const getAllUsers = async (req, res, next) => {
  try {
    const data = await userService.getAllUsers();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// ───────────────────────────────
// Получить пользователя по ID
// ───────────────────────────────
export const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
