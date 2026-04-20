const express = require("express");
const cors = require("cors");
const gameRoutes = require("./routes/gameRoutes");
const userRoutes = require("./routes/userRoutes");
const playSessionRoutes = require("./routes/playSessionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "GameTrack API is running" });
});

app.use("/api/games", gameRoutes);
app.use("/api/users", userRoutes);
app.use("/api", playSessionRoutes);

module.exports = app;