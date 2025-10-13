import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import User from "./Users.js";

const Complaint = sequelize.define(
  "Complaint",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    complaintText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    responseText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "users", key: "id" },
    },
  },
  {
    tableName: "complaints",
    timestamps: true,
  }
);

export default Complaint;
