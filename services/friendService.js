import Friend from "../db/models/Friend.js";
import User from "../db/models/Users.js";
import { Op } from "sequelize";

export const sendFriendRequest = async (requesterId, receiverId) => {
  if (requesterId === receiverId) {
    throw new Error("You cannot send a friend request to yourself");
  }

  const existing = await Friend.findOne({
    where: {
      [Op.or]: [
        { requesterId, receiverId },
        { requesterId: receiverId, receiverId: requesterId },
      ],
    },
  });

  if (existing) {
    throw new Error("Friend request already exists or you are already friends");
  }

  return await Friend.create({ requesterId, receiverId, status: "pending" });
};

export const getFriends = async (userId) => {
  return await Friend.findAll({
    where: {
      status: "accepted",
      [Op.or]: [{ requesterId: userId }, { receiverId: userId }],
    },
    include: [
      { model: User, as: "requester", attributes: ["id", "username"] },
      { model: User, as: "receiver", attributes: ["id", "username"] },
    ],
  });
};

export const getReceivedRequests = async (userId) => {
  return await Friend.findAll({
    where: { receiverId: userId, status: "pending" },
    include: [{ model: User, as: "requester", attributes: ["id", "username"] }],
  });
};

export const getSentRequests = async (userId) => {
  return await Friend.findAll({
    where: { requesterId: userId, status: "pending" },
    include: [{ model: User, as: "receiver", attributes: ["id", "username"] }],
  });
};

export const respondToFriendRequest = async (friendId, userId, status) => {
  const request = await Friend.findOne({
    where: { id: friendId, receiverId: userId, status: "pending" },
  });
  if (!request) throw new Error("Friend request not found");

  if (!["accepted", "declined"].includes(status)) {
    throw new Error("Invalid status value");
  }

  request.status = status;
  await request.save();
  return request;
};

export const removeFriend = async (friendId, userId) => {
  const friend = await Friend.findOne({
    where: {
      id: friendId,
      [Op.or]: [{ requesterId: userId }, { receiverId: userId }],
    },
  });

  if (!friend) throw new Error("Friend not found");
  await friend.destroy();
  return { message: "Friend removed" };
};
