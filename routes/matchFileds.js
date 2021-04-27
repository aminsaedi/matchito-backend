const express = require("express");

const matchFiledsController = require("../controllers/MatchFileds");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/:id", matchFiledsController.getMatchFileds);

router.post("/", auth, matchFiledsController.addMatchFileds);

module.exports = router;
