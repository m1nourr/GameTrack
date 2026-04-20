const Game = require("../models/Game");
const User = require("../models/User");

const getAllGames = async (req, res) => {
  try {
    const games = await Game.find().populate("userId", "username email");
    res.status(200).json(games);
  } catch (error) {
    console.error(" Get All Games error:", error.message);
    res.status(500).json({ message: "Failed to fetch games" });
  }
};

const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate("userId", "username email");

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch game" });
  }
};

const createGame = async (req, res) => {
  try {
    const { title, platform, genre, status, hoursPlayed, priority, rating, userId } = req.body;

    if (!title || !platform || !genre || !userId) {
      return res.status(400).json({ message: "title, platform, genre, and userId are required" });
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
    res.status(400).json({ message: error.message });
  }
};

const updateGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    await Game.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Game deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete game" });
  }
};

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
};