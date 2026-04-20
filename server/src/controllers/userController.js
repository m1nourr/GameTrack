const Game = require("../models/Game");
const User = require("../models/User");

const getGamesByUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const games = await Game.find({ userId: req.params.userId }).populate(
      "userId",
      "username email"
    );

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user games" });
  }
};

module.exports = {
  getGamesByUserId,
};