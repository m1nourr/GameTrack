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
      {
        username: "mikaelgamer",
        email: "mikael@example.com",
      },
      {
        username: "andreasgamer",
        email: "andreas@example.com",
      },
      {
        username: "enzogamer",
        email: "enzo@example.com",
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
        rating: 9,
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
        gameId: games[1]._id,
        userId: users[0]._id,
        sessionDate: new Date("2026-04-12"),
        hours: 1.5,
        notes: "Finished the main story and completed side content.",
      },
      {
        gameId: games[2]._id,
        userId: users[0]._id,
        sessionDate: new Date("2026-04-15"),
        hours: 2,
        notes: "Started the story and unlocked new suits.",
      },
      {
        gameId: games[3]._id,
        userId: users[1]._id,
        sessionDate: new Date("2026-04-11"),
        hours: 5,
        notes: "Built a base and collected resources with friends.",
      },
      {
        gameId: games[4]._id,
        userId: users[1]._id,
        sessionDate: new Date("2026-04-13"),
        hours: 2,
        notes: "Played Ultimate Team matches and completed objectives.",
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