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
        username: "deemagamer",
        email: "deema@example.com",
      },
    ]);

    const games = await Game.insertMany([
      {
        title: "GTA 5",
        platform: "PlayStation 5",
        genre: "Open World Action",
        status: "playing",
        hoursPlayed: 24,
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
        title: "Spider-Man 2",
        platform: "PlayStation 5",
        genre: "Action Adventure",
        status: "wishlist",
        hoursPlayed: 0,
        priority: "high",
        userId: users[0]._id,
      },
      {
        title: "Ark Survival Evolved",
        platform: "PC",
        genre: "Open World Survival",
        status: "dropped",
        hoursPlayed: 380,
        priority: "medium",
        rating: 8,
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
        notes: "Completed story missions and explored Los Santos.",
      },
      {
        gameId: games[0]._id,
        userId: users[0]._id,
        sessionDate: new Date("2026-04-12"),
        hours: 2.5,
        notes: "Did side activities and drove around the city.",
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