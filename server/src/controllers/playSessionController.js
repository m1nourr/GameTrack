const PlaySession = require("../models/PlaySession");
const Game = require("../models/Game");
const User = require("../models/User");

const getSessionsByGameId = async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    const sessions = await PlaySession.find({ gameId: req.params.gameId })
      .populate("gameId", "title platform")
      .populate("userId", "username email");

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch play sessions" });
  }
};

module.exports = {
  getSessionsByGameId,
};