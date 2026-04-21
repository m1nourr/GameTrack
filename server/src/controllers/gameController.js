const Game = require("../models/Game");
const User = require("../models/User");

const getAllGames = async (req, res, next) => {
  try {
    const games = await Game.find().populate("userId", "username email");
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
};

const getGameById = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id).populate("userId", "username email");

    if (!game) {
      const error = new Error("Game not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
};

const createGame = async (req, res, next) => {
  try {
    const { title, platform, genre, status, hoursPlayed, priority, rating, userId } = req.body;

    if (!title || !platform || !genre || !userId) {
      const error = new Error("title, platform, genre, and userId are required");
      error.statusCode = 400;
      return next(error);
    }

    const game = await Game.create({
      title,
      platform,
      genre,
      status,
      hoursPlayed,
      priority,
      rating,
      userId,
    });

    res.status(201).json(game);
  } catch (error) {
    next(error);
  }
};

const updateGame = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      const error = new Error("Game not found");
      error.statusCode = 404;
      return next(error);
    }

    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedGame);
  } catch (error) {
    next(error);
  }
};

const deleteGame = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      const error = new Error("Game not found");
      error.statusCode = 404;
      return next(error);
    }

    await Game.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Game deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const filterGames = async (req, res, next) => {
  try {
    const { status, platform, priority } = req.query;

    const filters = {};

    if (status) filters.status = status;
    if (platform) filters.platform = platform;
    if (priority) filters.priority = priority;

    const games = await Game.find(filters).populate("userId", "username email");

    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  filterGames,
};