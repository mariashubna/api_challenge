import User from "./models/Users.js";
import Challenge from "./models/Challenge.js";
import ChallengeDay from "./models/ChallengeDay.js";
import Invite from "./models/Invites.js";
import Friend from "./models/Friend.js";

// Challenge ↔ ChallengeDay
Challenge.hasMany(ChallengeDay, {
  as: "days",
  foreignKey: "challengeId",
  onDelete: "CASCADE",
});
ChallengeDay.belongsTo(Challenge, {
  as: "challenge",
  foreignKey: "challengeId",
});

// Challenge ↔ User (owner)
Challenge.belongsTo(User, { as: "owner", foreignKey: "ownerId" });

// Invite ↔ User / Challenge
Invite.belongsTo(User, { as: "fromUser", foreignKey: "fromUserId" });
Invite.belongsTo(User, { as: "toUser", foreignKey: "toUserId" });
Invite.belongsTo(Challenge, { as: "challenge", foreignKey: "challengeId" });

// Friend ↔ User
Friend.belongsTo(User, { as: "requester", foreignKey: "requesterId" });
Friend.belongsTo(User, { as: "receiver", foreignKey: "receiverId" });
