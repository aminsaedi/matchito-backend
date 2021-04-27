const express = require("express");

const adminController = require("../controllers/admins");

const router = express.Router();

router.post("/", adminController.postLogin);

router.post("/create", adminController.postRegister);

module.exports = router;
