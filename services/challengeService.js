import Challenge from "../db/models/Challenge.js";
import ChallengeDay from "../db/models/ChallengeDay.js";

export const createChallenge = async (data, ownerId) => {
  const challenge = await Challenge.create({ ...data, ownerId });

  // Создаем дни для челленджа
  for (let i = 0; i < challenge.duration; i++) {
    await ChallengeDay.create({
      challengeId: challenge.id,
      date: new Date(
        new Date(challenge.startDate).getTime() + i * 24 * 60 * 60 * 1000
      ),
    });
  }

  return challenge;
};

export const getChallenges = async (userId) => {
  return await Challenge.findAll({
    where: { ownerId: userId },
    include: [{ model: ChallengeDay, as: "days" }],
  });
};

export const getChallengeById = async (challengeId, userId) => {
  return await Challenge.findOne({
    where: { id: challengeId, ownerId: userId },
    include: [{ model: ChallengeDay, as: "days" }],
  });
};

export const updateChallenge = async (challengeId, data, userId) => {
  const challenge = await Challenge.findOne({
    where: { id: challengeId, ownerId: userId },
  });
  if (!challenge) throw new Error("Challenge not found");
  await challenge.update(data);
  return challenge;
};

export const deleteChallenge = async (challengeId, userId) => {
  const challenge = await Challenge.findOne({
    where: { id: challengeId, ownerId: userId },
  });
  if (!challenge) throw new Error("Challenge not found");
  await challenge.destroy();
  return true;
};
