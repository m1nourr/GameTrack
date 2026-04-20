const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const User = require("../models/User");
const Game = require("../models/Game");
const PlaySession = require("../models/PlaySession");

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await PlaySession.deleteMany();
    await Game.deleteMany();
    await User.deleteMany();

    const users = await User.insertMany([
      {
        username: "mahmoudgamer",
        email: "mahmoud@example.com",
      },
      {
        username: "samirplays",
        email: "samir@example.com",
      },
    ]);

    const games = await Game.insertMany([
      {
        title: "Elden Ring",
        platform: "PC",
        genre: "Action RPG",
        status: "playing",
        hoursPlayed: 42,
        priority: "high",
        rating: 9,
        userId: users[0]._id,
      },
      {
        title: "God of War Ragnarök",
        platform: "PlayStation 5",
        genre: "Action Adventure",
        status: "completed",
        hoursPlayed: 31,
        priority: "medium",
        rating: 10,
        userId: users[0]._id,
      },
      {
        title: "Hades",
        platform: "Nintendo Switch",
        genre: "Roguelike",
        status: "backlog",
        hoursPlayed: 0,
        priority: "high",
        userId: users[0]._id,
      },
      {
        title: "Cyberpunk 2077",
        platform: "PC",
        genre: "Open World RPG",
        status: "wishlist",
        hoursPlayed: 0,
        priority: "medium",
        userId: users[1]._id,
      },
      {
        title: "EA Sports FC 25",
        platform: "PlayStation 5",
        genre: "Sports",
        status: "playing",
        hoursPlayed: 18,
        priority: "low",
        rating: 7,
        userId: users[1]._id,
      },
    ]);

    await PlaySession.insertMany([
      {
        gameId: games[0]._id,
        userId: users[0]._id,
        sessionDate: new Date("2026-04-10"),
        hours: 3,
        notes: "Beat two bosses and explored a new area.",
      },
      {
        gameId: games[0]._id,
        userId: users[0]._id,
        sessionDate: new Date("2026-04-12"),
        hours: 2.5,
        notes: "Farmed runes and upgraded gear.",
      },
      {
        gameId: games[1]._id,
        userId: users[0]._id,
        sessionDate: new Date("2026-04-05"),
        hours: 4,
        notes: "Finished the main story.",
      },
      {
        gameId: games[4]._id,
        userId: users[1]._id,
        sessionDate: new Date("2026-04-11"),
        hours: 1.5,
        notes: "Played Ultimate Team matches online.",
      },
      {
        gameId: games[4]._id,
        userId: users[1]._id,
        sessionDate: new Date("2026-04-13"),
        hours: 2,
        notes: "Completed objectives and adjusted the squad.",
      },
    ]);

    console.log("Seed data inserted");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedData();