const express = require("express");

const auth = require("../middlewares/auth");
const themeController = require("../controllers/theme");

const router = express.Router();

router.get("/", themeController.getAll);

router.post("/", auth, themeController.postCreate);

router.delete("/:id", auth, themeController.deleteById);

module.exports = router;
