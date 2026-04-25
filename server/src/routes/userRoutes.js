const express = require("express");
const router = express.Router();
const { getAllUsers, getGamesByUserId, createUser} = require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/:userId/games", getGamesByUserId);
router.post("/", createUser);

module.exports = router;