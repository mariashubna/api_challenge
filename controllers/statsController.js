import * as statsService from "../services/statsService.js";

export const getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const stats = await statsService.getUserStats(userId);
    res.json(stats);
  } catch (err) {
    console.error("Error fetching user stats:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
