import Challenge from "../db/models/Challenge.js";
import ChallengeDay from "../db/models/ChallengeDay.js";
import ChallengeParticipant from "../db/models/ChallengeParticipants.js";
import User from "../db/models/Users.js";
import { Op } from "sequelize";
import sequelize from "../db/sequelize.js";

// ───────────────────────────────
// Создать челлендж
// ───────────────────────────────
export const createChallenge = async (data, ownerId) => {
  const challenge = await Challenge.create({ ...data, ownerId });

  // Добавляем владельца как участника
  await ChallengeParticipant.create({
    challengeId: challenge.id,
    userId: ownerId,
    role: "owner",
  });

  // Создаем дни
  for (let i = 0; i < challenge.duration; i++) {
    await ChallengeDay.create({
      challengeId: challenge.id,
      date: new Date(
        new Date(challenge.startDate).getTime() + i * 24 * 60 * 60 * 1000
      ),
    });
  }

  return challenge;
};

// ───────────────────────────────
// Все челленджи, где пользователь участвует (и владелец)
// ───────────────────────────────
export const getChallenges = async (userId) => {
  return await Challenge.findAll({
    include: [
      {
        model: User,
        as: "participants",
        attributes: ["id", "email"],
        through: { attributes: [] },
      },
      { model: ChallengeDay, as: "days" },
      { model: User, as: "owner", attributes: ["id", "email"] },
    ],
    where: sequelize.literal(`
      "ownerId" = ${userId} OR
      EXISTS (
        SELECT 1
        FROM challenge_participants cp
        WHERE cp."challengeId" = "Challenge"."id"
        AND cp."userId" = ${userId}
      )
    `),
    order: [["createdAt", "DESC"]],
  });
};

// ───────────────────────────────
// Получить челлендж по ID (участник или владелец)
// ───────────────────────────────
export const getChallengeById = async (challengeId, userId) => {
  return await Challenge.findOne({
    where: sequelize.literal(`
      "id" = ${challengeId} AND (
        "ownerId" = ${userId} OR
        EXISTS (
          SELECT 1
          FROM challenge_participants cp
          WHERE cp."challengeId" = "Challenge"."id"
          AND cp."userId" = ${userId}
        )
      )
    `),
    include: [
      { model: ChallengeDay, as: "days" },
      {
        model: User,
        as: "participants",
        attributes: ["id", "email"],
        through: { attributes: [] },
      },
      { model: User, as: "owner", attributes: ["id", "email"] },
    ],
  });
};

// ───────────────────────────────
// Обновить челлендж (только владелец)
// ───────────────────────────────
export const updateChallenge = async (challengeId, data, userId) => {
  const challenge = await Challenge.findOne({
    where: { id: challengeId, ownerId: userId },
  });
  if (!challenge) throw new Error("Challenge not found or no permission");
  await challenge.update(data);
  return challenge;
};

// ───────────────────────────────
// Удалить челлендж (только владелец)
// ───────────────────────────────
export const deleteChallenge = async (challengeId, userId) => {
  const challenge = await Challenge.findOne({
    where: { id: challengeId, ownerId: userId },
  });
  if (!challenge) throw new Error("Challenge not found or no permission");
  await challenge.destroy();
  return true;
};

// ───────────────────────────────
// Пройденные челленджи (isCompleted = true)
// ───────────────────────────────
export const getCompletedChallenges = async (userId) => {
  return await Challenge.findAll({
    where: sequelize.literal(`
      "isCompleted" = true AND (
        "ownerId" = ${userId} OR
        EXISTS (
          SELECT 1
          FROM challenge_participants cp
          WHERE cp."challengeId" = "Challenge"."id"
          AND cp."userId" = ${userId}
        )
      )
    `),
    include: [
      {
        model: User,
        as: "participants",
        attributes: ["id", "email"],
        through: { attributes: [] },
      },
      { model: User, as: "owner", attributes: ["id", "email"] },
      { model: ChallengeDay, as: "days" },
    ],
    order: [["createdAt", "DESC"]],
  });
};

// ───────────────────────────────
// Непройденные челленджи (isCompleted = false)
// ───────────────────────────────
export const getPendingChallenges = async (userId) => {
  return await Challenge.findAll({
    where: sequelize.literal(`
      "isCompleted" = false AND (
        "ownerId" = ${userId} OR
        EXISTS (
          SELECT 1
          FROM challenge_participants cp
          WHERE cp."challengeId" = "Challenge"."id"
          AND cp."userId" = ${userId}
        )
      )
    `),
    include: [
      { model: ChallengeDay, as: "days" },
      {
        model: User,
        as: "participants",
        attributes: ["id", "email"],
        through: { attributes: [] },
      },
      { model: User, as: "owner", attributes: ["id", "email"] },
    ],
    order: [["createdAt", "DESC"]],
  });
};
