import * as inviteService from "../services/inviteService.js";

export const sendInvite = async (req, res) => {
  try {
    const invite = await inviteService.sendInvite(
      req.user.id,
      req.body.toUserId,
      req.body.challengeId
    );
    res.status(201).json(invite);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserInvites = async (req, res) => {
  try {
    const invites = await inviteService.getUserInvites(req.user.id);
    res.json(invites);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const respondToInvite = async (req, res) => {
  try {
    const invite = await inviteService.respondToInvite(
      req.params.id,
      req.user.id,
      req.body.status
    );
    res.json(invite);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
