const Game = require("../models/Game");
const User = require("../models/User");


const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ username: 1 });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

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

const createUser = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      const error = new Error("username and email are required");
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.create({
      username,
      email,
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGamesByUserId,
  getAllUsers,
  createUser,
};