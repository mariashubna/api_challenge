import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Challenge = sequelize.define(
  "Challenge",
  {
    startDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    duration: { type: DataTypes.INTEGER, defaultValue: 7 },
    useGoal: { type: DataTypes.BOOLEAN, defaultValue: false },
    color: { type: DataTypes.STRING, defaultValue: "#FF0000" },
    name: { type: DataTypes.STRING, allowNull: false },
    isCompleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    goalValue: { type: DataTypes.DOUBLE, defaultValue: 0 },
    goalUnit: { type: DataTypes.STRING, defaultValue: "" },
    useNotification: { type: DataTypes.BOOLEAN, defaultValue: false },
    notificationHour: { type: DataTypes.INTEGER, defaultValue: 0 },
    notificationMinute: { type: DataTypes.INTEGER, defaultValue: 0 },
    notificationIdentifier: { type: DataTypes.STRING, defaultValue: "" },
    order: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { tableName: "challenges" }
);

export default Challenge;
