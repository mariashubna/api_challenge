import * as friendService from "../services/friendService.js";

// Отправка запроса
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

// Получить список друзей
export const getFriends = async (req, res) => {
  try {
    const friends = await friendService.getFriends(req.user.id);
    res.json(friends);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Получить входящие запросы
export const getReceivedRequests = async (req, res) => {
  try {
    const requests = await friendService.getReceivedRequests(req.user.id);
    res.json(requests);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Получить отправленные запросы
export const getSentRequests = async (req, res) => {
  try {
    const requests = await friendService.getSentRequests(req.user.id);
    res.json(requests);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Принять/отклонить запрос
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

// Удалить из друзей
export const removeFriend = async (req, res) => {
  try {
    const result = await friendService.removeFriend(req.params.id, req.user.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Принять запрос
export const acceptFriendRequest = async (req, res) => {
  try {
    const friend = await friendService.respondToFriendRequest(
      req.params.id,
      req.user.id,
      "accepted"
    );
    res.json(friend);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Отклонить запрос
export const rejectFriendRequest = async (req, res) => {
  try {
    const friend = await friendService.respondToFriendRequest(
      req.params.id,
      req.user.id,
      "rejected"
    );
    res.json(friend);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
