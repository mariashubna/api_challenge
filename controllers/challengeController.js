import * as challengeService from "../services/challengeService.js";

export const createChallenge = async (req, res) => {
  try {
    const challenge = await challengeService.createChallenge(
      req.body,
      req.user.id
    );
    res.status(201).json(challenge);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getChallenges = async (req, res) => {
  try {
    const challenges = await challengeService.getChallenges(req.user.id);
    res.json(challenges);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getChallengeById = async (req, res) => {
  try {
    const challenge = await challengeService.getChallengeById(
      req.params.id,
      req.user.id
    );
    if (!challenge)
      return res.status(404).json({ error: "Challenge not found" });
    res.json(challenge);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateChallenge = async (req, res) => {
  try {
    const challenge = await challengeService.updateChallenge(
      req.params.id,
      req.body,
      req.user.id
    );
    res.json(challenge);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteChallenge = async (req, res) => {
  try {
    await challengeService.deleteChallenge(req.params.id, req.user.id);
    res.json({ message: "Challenge deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getCompletedChallenges = async (req, res, next) => {
  try {
    const challenges = await challengeService.getCompletedChallenges(
      req.user.id
    );
    res.json(challenges);
  } catch (err) {
    next(err);
  }
};

export const getPendingChallenges = async (req, res, next) => {
  try {
    const challenges = await challengeService.getPendingChallenges(req.user.id);
    res.json(challenges);
  } catch (err) {
    next(err);
  }
};
