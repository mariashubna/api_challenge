import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Friend = sequelize.define(
  "Friend",
  {
    requesterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "declined"),
      defaultValue: "pending",
    },
  },
  { tableName: "friends" }
);

export default Friend;
