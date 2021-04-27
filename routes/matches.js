const express = require("express");

const matchController = require("../controllers/match");

const router = express.Router();

router.get("/", matchController.getAllMatches);

router.get("/active", matchController.getActiveMatches);

router.post("/", matchController.createMatch);

module.exports = router;
