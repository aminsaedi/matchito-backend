const express = require("express");

const userController = require("../controllers/users");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", userController.getAllUsers);

router.post("/", userController.postCreateUser);

router.post("/requestOtp", userController.postRequestOtp);

router.post("/passwordLogin", userController.postLoginWithPassword);

router.post("/otpLogin", userController.postLoginWithOtp);

router.get("/matches", auth, userController.getUserMatches);

module.exports = router;
