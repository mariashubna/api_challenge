import jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
if (!JWT_REFRESH_SECRET) throw new Error("JWT_REFRESH_SECRET is not defined");

// Access token
export const createToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

// Refresh token
export const createRefreshToken = (payload) =>
  jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });

// Verify access token
export const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return { payload };
  } catch (error) {
    return { error };
  }
};

// Verify refresh token
export const verifyRefreshToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_REFRESH_SECRET);
    return { payload };
  } catch (error) {
    return { error };
  }
};
