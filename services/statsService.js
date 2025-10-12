import Challenge from "../db/models/Challenge.js";
import ChallengeDay from "../db/models/ChallengeDay.js";

export const getUserStats = async (userId) => {
  const challenges = await Challenge.findAll({
    where: { ownerId: userId },
    include: [{ model: ChallengeDay, as: "days" }],
  });

  return challenges.map((ch) => {
    const completed = ch.days.filter((d) => d.isCompleted).length;
    return {
      challengeId: ch.id,
      name: ch.name,
      totalDays: ch.days.length,
      completedDays: completed,
      progress: ch.days.length
        ? Math.round((completed / ch.days.length) * 100)
        : 0,
    };
  });
};
