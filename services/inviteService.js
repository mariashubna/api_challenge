import Invite from "../db/models/Invites.js";

export const sendInvite = async (fromUserId, toUserId, challengeId) => {
  return await Invite.create({ fromUserId, toUserId, challengeId });
};

export const getUserInvites = async (userId) => {
  return await Invite.findAll({
    where: { toUserId: userId },
    include: ["fromUser", "challenge"],
  });
};

export const respondToInvite = async (inviteId, userId, status) => {
  const invite = await Invite.findOne({
    where: { id: inviteId, toUserId: userId },
  });
  if (!invite) throw new Error("Invite not found");
  invite.status = status;
  await invite.save();
  return invite;
};
