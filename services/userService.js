import User from "../db/models/Users.js";
import Challenge from "../db/models/Challenge.js";
import ChallengeDay from "../db/models/ChallengeDay.js";
import ChallengeParticipant from "../db/models/ChallengeParticipants.js";
import Invite from "../db/models/Invites.js";
import Friend from "../db/models/Friend.js";

// ───────────────────────────────
// Получить всех пользователей с ролью "user" + количество
// ───────────────────────────────
export const getAllUsers = async () => {
  const users = await User.findAll({
    where: { roles: "user" },
    attributes: ["id", "email", "createdAt", "updatedAt"],
    order: [["createdAt", "DESC"]],
  });

  const count = await User.count({ where: { roles: "user" } });

  return { count, users };
};

export const getUserById = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: ["id", "email", "createdAt"],
    include: [
      // Челленджи, где юзер является участником
      {
        model: Challenge,
        as: "joinedChallenges",
        attributes: ["id", "name", "isCompleted", "duration", "color"],
        through: { attributes: ["role"] },
      },
      // Челленджи, где юзер владелец
      {
        model: Challenge,
        as: "ownerChallenges",
        attributes: ["id", "name", "isCompleted", "duration", "color"],
        include: [
          {
            model: ChallengeDay,
            as: "days",
            attributes: ["id", "date", "isFinished"],
          },
        ],
      },
      // Приглашённые друзья
      {
        model: Invite,
        as: "sentInvites",
        attributes: ["id"],
        include: [{ model: User, as: "toUser", attributes: ["id", "email"] }],
      },
      {
        model: Invite,
        as: "receivedInvites",
        attributes: ["id"],
        include: [{ model: User, as: "fromUser", attributes: ["id", "email"] }],
      },
      // Друзья
      {
        model: Friend,
        as: "requesterFriends",
        attributes: ["id"],
        include: [{ model: User, as: "receiver", attributes: ["id", "email"] }],
      },
      {
        model: Friend,
        as: "receiverFriends",
        attributes: ["id"],
        include: [
          { model: User, as: "requester", attributes: ["id", "email"] },
        ],
      },
    ],
  });

  if (!user) throw new Error("User not found");

  // Подсчёт прогресса
  const myChallenges = user.joinedChallenges.length;

  return user;
};
