import sequelize from "./sequelize.js";
import "./models/Users.js";
import "./models/Challenge.js";
import "./models/ChallengeDay.js";
import "./models/Invites.js";
import "./models/Friend.js";
import "./associations.js";

export async function initDb() {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful");

    // Опционально синхронизируем модели
    if (process.env.SYNC_DB === "true") {
      await sequelize.sync({ alter: true });
      console.log("All models synchronized successfully");
    }
  } catch (err) {
    console.error("Database initialization failed:", err);
    process.exit(1);
  }
}
