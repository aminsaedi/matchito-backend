const express = require("express");

const participantsController = require("../controllers/participants");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/:id", participantsController.getMatchParticipants);

router.post("/", auth, participantsController.addParticipants);

module.exports = router;
