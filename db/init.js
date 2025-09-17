import sequelize from "./sequelize.js";
import "./Users.js";
import "./Challenge.js";
import "./Invites.js";

export async function initDb() {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log("All models synchronized successfully");
}
