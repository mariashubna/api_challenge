import User from "./models/Users.js";
import Challenge from "./models/Challenge.js";
import ChallengeDay from "./models/ChallengeDay.js";
import Invite from "./models/Invites.js";
import Friend from "./models/Friend.js";
import ChallengeParticipant from "./models/ChallengeParticipants.js";
import Complaint from "./models/Complaint.js";

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

// Challenge ↔ User (participants)
Challenge.belongsToMany(User, {
  through: ChallengeParticipant,
  as: "participants",
  foreignKey: "challengeId",
});
User.belongsToMany(Challenge, {
  through: ChallengeParticipant,
  as: "joinedChallenges",
  foreignKey: "userId",
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

User.hasMany(Challenge, { as: "ownerChallenges", foreignKey: "ownerId" });
User.hasMany(Invite, { as: "sentInvites", foreignKey: "fromUserId" });
User.hasMany(Invite, { as: "receivedInvites", foreignKey: "toUserId" });
User.hasMany(Friend, { as: "requesterFriends", foreignKey: "requesterId" });
User.hasMany(Friend, { as: "receiverFriends", foreignKey: "receiverId" });
User.hasMany(Complaint, { as: "complaints", foreignKey: "userId" });
User.hasMany(Complaint, { as: "handledComplaints", foreignKey: "adminId" });

// Complaint
Complaint.belongsTo(User, { as: "user", foreignKey: "userId" });
Complaint.belongsTo(User, { as: "admin", foreignKey: "adminId" });
