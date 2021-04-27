const express = require("express");

const refreeContoller = require("../controllers/referee");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", refreeContoller.getAllReferees);

router.post("/", refreeContoller.postLogin);

router.post("/create", auth, refreeContoller.postRegister);

module.exports = router;
