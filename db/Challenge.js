import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js";
import User from "./Users.js";

// Основная модель Challenge
const Challenge = sequelize.define(
  "Challenge",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    days: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    daysPassed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("active", "completed", "dropped"),
      defaultValue: "active",
    },
  },
  { tableName: "challenges" }
);

// 🔹 Создатель челленджа
Challenge.belongsTo(User, {
  as: "creator",
  foreignKey: "created_by",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(Challenge, { as: "challenges", foreignKey: "created_by" });

// 🔹 Пользователи, которые проходят челлендж (многие ко многим)
Challenge.belongsToMany(User, {
  through: "ChallengeParticipants",
  as: "participants",
  foreignKey: "challenge_id",
});
User.belongsToMany(Challenge, {
  through: "ChallengeParticipants",
  as: "activeChallenges",
  foreignKey: "user_id",
});

export default Challenge;
