import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const ChallengeDay = sequelize.define(
  "ChallengeDay",
  {
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    isCompleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    note: { type: DataTypes.STRING, defaultValue: "" },
    feeling: { type: DataTypes.INTEGER, defaultValue: 3 },
    goalValue: { type: DataTypes.DOUBLE, defaultValue: 0 },
  },
  { tableName: "challenge_days" }
);

export default ChallengeDay;
