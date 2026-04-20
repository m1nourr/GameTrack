const express = require("express");
const router = express.Router();
const { getSessionsByGameId } = require("../controllers/playSessionController");

router.get("/games/:gameId/sessions", getSessionsByGameId);

module.exports = router;