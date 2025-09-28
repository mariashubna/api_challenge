import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js";
import { emailRegexp, passRegexp } from "../constants/auth.js";

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { is: emailRegexp },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { is: passRegexp },
    },
    appleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    roles: {
      type: DataTypes.ENUM("user", "admin", "superAdmin"),
      defaultValue: "user",
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    refreshToken: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  { tableName: "users" }
);

export default User;
