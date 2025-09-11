import jwt from "jsonwebtoken";

const { JWT_SECRET, REFRESH_SECRET } = process.env;

export const createToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });

export const createRefreshToken = (payload) =>
  jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

export const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return { payload };
  } catch (error) {
    return { error };
  }
};

export const verifyRefreshToken = (token) => {
  try {
    const payload = jwt.verify(token, REFRESH_SECRET);
    return { payload };
  } catch (error) {
    return { error };
  }
};
