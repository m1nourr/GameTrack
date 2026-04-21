const Game = require("../models/Game");
const User = require("../models/User");

const getGamesByUserId = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    const games = await Game.find({ userId: req.params.userId }).populate(
      "userId",
      "username email"
    );

    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGamesByUserId,
};