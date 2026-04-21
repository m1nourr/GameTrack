const PlaySession = require("../models/PlaySession");
const Game = require("../models/Game");
const User = require("../models/User");

const getSessionsByGameId = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.gameId);

    if (!game) {
      const error = new Error("Game not found");
      error.statusCode = 404;
      return next(error);
    }

    const sessions = await PlaySession.find({ gameId: req.params.gameId })
      .populate("gameId", "title platform")
      .populate("userId", "username email");

    res.status(200).json(sessions);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSessionsByGameId,
};