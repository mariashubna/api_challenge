import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

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

export default Invite;
