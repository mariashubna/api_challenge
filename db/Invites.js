import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js";
import User from "./Users.js";
import Challenge from "./Challenge.js";

const Invite = sequelize.define(
  "Invite",
  {
    status: {
      type: DataTypes.ENUM("pending", "accepted", "declined"),
      defaultValue: "pending",
    },
  },
  { tableName: "invites" }
);

// 🔗 Кто отправил вызов
Invite.belongsTo(User, { as: "fromUser", foreignKey: "from_user_id" });
// 🔗 Кому отправили вызов
Invite.belongsTo(User, { as: "toUser", foreignKey: "to_user_id" });
// 🔗 Какому челленджу относится
Invite.belongsTo(Challenge, { as: "challenge", foreignKey: "challenge_id" });

export default Invite;
