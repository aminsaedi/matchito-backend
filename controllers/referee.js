const bcrypt = require("bcrypt");
const jwt = require("../utilities/jwt");
const config = require("config");

const Referee = require("../models/referee");

exports.getAllReferees = async (req, res) => {
  const referees = await Referee.findAll({
    attributes: { exclude: ["password"] },
  });
  res.send(referees);
};

exports.postLogin = async (req, res) => {
  if (!req.body.username || !req.body.password)
    return res
      .status(400)
      .send({ message: "No username and or password provided", status: 312 });
  const referee = await Referee.findOne({
    where: { username: req.body.username },
  });
  if (!referee)
    return res
      .status(401)
      .send({ message: "Invalid username and or password", status: 324 });
  const correctPassword = await bcrypt.compare(
    req.body.password,
    referee.password
  );
  if (!correctPassword)
    return res
      .status(401)
      .send({ messahe: "Invalid username and or password", status: 005 });
  const token = jwt.generateRefereeToken(referee);
  res.header("x-auth-token", token).status(200).send(token);
};

exports.postRegister = async (req, res) => {
  if (req.user.type != "admin")
    return res.status(401).send({
      message: "Ony admin users are allow to create new referee",
      status: 313,
    });
  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash(req.body.password, salt);
  try {
    await Referee.create({
      name: req.body.name,
      username: req.body.username,
      password,
    });
    res.status(201).send({ message: "Referee created", status: 201 });
  } catch (error) {
    res.status(400).send({
      message: "Failed to create Referee",
      status: 300,
      data: error.errors,
    });
  }
};
