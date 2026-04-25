const express = require("express");
const router = express.Router();
const { getSessionsByGameId, createSessionForGame } = require("../controllers/playSessionController");

router.get("/games/:gameId/sessions", getSessionsByGameId);
router.post("/games/:gameId/sessions", createSessionForGame);

module.exports = router;