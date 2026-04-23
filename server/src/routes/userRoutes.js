const express = require("express");
const router = express.Router();
const { getAllUsers, getGamesByUserId } = require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/:userId/games", getGamesByUserId);

module.exports = router;