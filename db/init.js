import sequelize from "./sequelize.js";
import User from "./Users.js";
import Challenge from "./Challenge.js";
import Invite from "./Invites.js";

export async function initDb() {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log("All models synchronized successfully");
}
