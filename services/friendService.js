import Friend from "../db/models/Friend.js";

export const sendFriendRequest = async (requesterId, receiverId) => {
  return await Friend.create({ requesterId, receiverId });
};

export const getFriends = async (userId) => {
  return await Friend.findAll({
    where: { status: "accepted" },
    include: ["requester", "receiver"],
  });
};

export const respondToFriendRequest = async (friendId, userId, status) => {
  const request = await Friend.findOne({
    where: { id: friendId, receiverId: userId },
  });
  if (!request) throw new Error("Friend request not found");
  request.status = status;
  await request.save();
  return request;
};
