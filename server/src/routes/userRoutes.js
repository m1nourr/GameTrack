const express = require("express");
const router = express.Router();
const { getGamesByUserId } = require("../controllers/userController");

router.get("/:userId/games", getGamesByUserId);

module.exports = router;