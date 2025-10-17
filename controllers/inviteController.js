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

export const getSentInvites = async (req, res) => {
  try {
    const invites = await inviteService.getSentInvites(req.user.id);
    res.json(invites);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const acceptInvite = async (req, res) => {
  try {
    const invite = await inviteService.acceptInvite(req.params.id, req.user.id);
    res.json(invite);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteInvite = async (req, res) => {
  try {
    const result = await inviteService.deleteInvite(req.params.id, req.user.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
