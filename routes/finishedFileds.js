const express = require("express");

const finishedFiledsController = require("../controllers/finishedFileds");

const router = express.Router();

router.post("/", finishedFiledsController.uploadFiled);

module.exports = router;
