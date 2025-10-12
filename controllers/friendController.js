import * as friendService from "../services/friendService.js";

export const sendFriendRequest = async (req, res) => {
  try {
    const friend = await friendService.sendFriendRequest(
      req.user.id,
      req.body.receiverId
    );
    res.status(201).json(friend);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getFriends = async (req, res) => {
  try {
    const friends = await friendService.getFriends(req.user.id);
    res.json(friends);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const respondToFriendRequest = async (req, res) => {
  try {
    const friend = await friendService.respondToFriendRequest(
      req.params.id,
      req.user.id,
      req.body.status
    );
    res.json(friend);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
