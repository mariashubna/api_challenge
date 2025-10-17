import Invite from "../db/models/Invites.js";
import User from "../db/models/Users.js";
import Challenge from "../db/models/Challenge.js";
import { Op } from "sequelize";

export const sendInvite = async (fromUserId, toUserId, challengeId) => {
  return await Invite.create({ fromUserId, toUserId, challengeId });
};

export const getUserInvites = async (userId) => {
  return await Invite.findAll({
    where: { toUserId: userId },
    include: ["fromUser", "challenge"],
  });
};

export const getSentInvites = async (userId) => {
  return await Invite.findAll({
    where: { fromUserId: userId },
    include: [
      { model: User, as: "toUser", attributes: ["id", "username", "email"] },
      { model: Challenge, as: "challenge" },
    ],
    order: [["createdAt", "DESC"]],
  });
};

export const acceptInvite = async (inviteId, userId) => {
  // Находим приглашение с подключённым challenge
  const invite = await Invite.findOne({
    where: { id: inviteId, toUserId: userId },
    include: [{ model: Challenge, as: "challenge" }],
  });

  if (!invite) throw new Error("Invite not found");
  if (!invite.challenge) throw new Error("Challenge not found");

  // Добавляем пользователя в участников челленджа
  await invite.challenge.addParticipant(userId, {
    through: { role: "participant" },
  });

  // Удаляем приглашение
  await invite.destroy();

  return { message: "Invite accepted and removed from invites" };
};

export const deleteInvite = async (inviteId, userId) => {
  const invite = await Invite.findOne({
    where: {
      id: inviteId,
      [Op.or]: [{ fromUserId: userId }, { toUserId: userId }],
    },
  });
  if (!invite) throw new Error("Invite not found");

  await invite.destroy();
  return { message: "Invite deleted" };
};
