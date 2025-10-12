import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Friend = sequelize.define(
  "Friend",
  {
    status: {
      type: DataTypes.ENUM("pending", "accepted", "declined"),
      defaultValue: "pending",
    },
  },
  { tableName: "friends" }
);

export default Friend;
