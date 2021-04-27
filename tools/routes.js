const express = require("express");
const fileUpload = require("express-fileupload");

const users = require("../routes/users");
const admins = require("../routes/admins");
const referees = require("../routes/referees");
const themes = require("../routes/themes");
const matches = require("../routes/matches");
const matchFileds = require("../routes/matchFileds");
const participants = require("../routes/participants");
const finishedFileds = require("../routes/finishedFileds");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.static("public"));
  app.use(
    fileUpload({
      createParentPath: true,
    })
  );
  app.use("/api/users", users);
  app.use("/api/admins", admins);
  app.use("/api/referees", referees);
  app.use("/api/themes", themes);
  app.use("/api/matches", matches);
  app.use("/api/matchFileds", matchFileds);
  app.use("/api/participants", participants);
  app.use("/api/finishedFileds", finishedFileds);
};
