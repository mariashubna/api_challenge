import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import User from "../db/Users.js";
import HttpError from "../helpers/HttpError.js";
import {
  createToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../helpers/jwt.js";

// Apple JWKS
const client = jwksClient({ jwksUri: "https://appleid.apple.com/auth/keys" });
function getAppleKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) callback(err);
    else callback(null, key.getPublicKey());
  });
}

export const findUser = (query) =>
  User.findOne({
    where: query,
  });

// ===== Classic Register/Login =====
export const registerUser = async (payload) => {
  const { email, password, name } = payload;

  const existingUser = await findUser({ email });
  if (existingUser) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // всегда регистрируем только с ролью "user"
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    roles: "user",
  });

  const payloadForToken = { id: newUser.id, role: newUser.roles };
  const token = createToken(payloadForToken);
  const refreshToken = createRefreshToken(payloadForToken);

  newUser.token = token;
  newUser.refreshToken = refreshToken;
  await newUser.save();

  return { token, refreshToken, user: newUser };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !user.password) throw HttpError(401, "Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw HttpError(401, "Invalid credentials");

  const payload = { id: user.id, role: user.roles };
  const token = createToken(payload);
  const refreshToken = createRefreshToken(payload);

  user.token = token;
  user.refreshToken = refreshToken;
  await user.save();

  return { token, refreshToken, user };
};

export const logoutUser = async (user) => {
  user.token = null;
  user.refreshToken = null;
  await user.save();
};

// вспомогательная функция — получить юзера по id
export const getUserById = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) throw HttpError(404, "User not found");
  return user;
};

// ===== Apple Login =====
export const loginWithApple = async (appleToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      appleToken,
      getAppleKey,
      { algorithms: ["RS256"] },
      async (err, decoded) => {
        if (err) return reject(HttpError(401, "Invalid Apple Token"));

        const { sub: appleId, email } = decoded;

        let user = await User.findOne({ where: { appleId } });
        if (!user) {
          user = await User.create({
            email: email || `${appleId}@appleuser.com`,
            appleId,
            roles: "user", // всегда "user"
          });
        }

        const payload = { id: user.id, role: user.roles };
        const token = createToken(payload);
        const refreshToken = createRefreshToken(payload);

        user.token = token;
        user.refreshToken = refreshToken;
        await user.save();

        resolve({ token, refreshToken, user });
      }
    );
  });
};

// ===== Refresh Tokens =====
export const refreshTokens = async (refreshToken) => {
  if (!refreshToken) throw HttpError(401, "Not authorized");

  const { payload, error } = verifyRefreshToken(refreshToken);
  if (error) throw HttpError(401, error.message);

  const user = await User.findOne({ where: { id: payload.id, refreshToken } });
  if (!user) throw HttpError(401, "Not authorized");

  const newToken = createToken({ id: user.id, role: user.roles });
  const newRefreshToken = createRefreshToken({ id: user.id, role: user.roles });

  user.token = newToken;
  user.refreshToken = newRefreshToken;
  await user.save();

  return { token: newToken, refreshToken: newRefreshToken, user };
};
