import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const ChallengeParticipant = sequelize.define(
  "ChallengeParticipant",
  {
    role: {
      type: DataTypes.ENUM("owner", "participant"),
      defaultValue: "participant",
    },
  },
  { tableName: "challenge_participants" }
);

export default ChallengeParticipant;
