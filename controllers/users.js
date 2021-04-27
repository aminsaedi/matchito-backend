const bcrypt = require("bcrypt");
const sequelize = require("../tools/database");
const { QueryTypes } = require("sequelize");

const User = require("../models/user");

const sms = require("../utilities/sms");
const jwt = require("../utilities/jwt");
const meliCode = require("../utilities/meliCode");

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({
    order: [["score", "DESC"]],
    attributes: { include: ["user_id", "first_name", "last_name"] },
  });
  res.send(users);
};

exports.postCreateUser = async (req, res, next) => {
  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash(req.body.password, salt);
  const validMeliCode = meliCode(req.body.meli_code);
  if (!validMeliCode)
    return res.status(400).send({ message: "Invalid meli code", status: 321 });
  try {
    await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      mobile: req.body.mobile,
      password,
      meli_code: req.body.meli_code,
    });
    res.status(201).send({ message: "User created", status: 201 });
  } catch (error) {
    res.status(400).send({
      message: "Failed to create user",
      status: 300,
      data: error.errors,
    });
  }
};

exports.postRequestOtp = async (req, res) => {
  var regex = new RegExp("^(\\+98|0)?9\\d{9}$");
  if (!req.body.mobile)
    return res.status(400).send({ message: "No mobile", status: 902 });
  if (!regex.test(req.body.mobile))
    return res
      .status(400)
      .send({ message: "Invalid mobile number", status: 902 });
  const user = await User.findOne({ where: { mobile: req.body.mobile } });
  if (!user) return res.status(400).send({ message: "No mobile in database" });
  const otp = sms.sendOtp(user.mobile);
  await User.update({ otp_code: otp }, { where: { mobile: user.mobile } });
  res.status(200).send({ message: "otp code sent", status: 905 });
};

exports.postLoginWithPassword = async (req, res) => {
  var regex = new RegExp("^(\\+98|0)?9\\d{9}$");
  if (!req.body.mobile)
    return res.status(400).send({ message: "No mobile", status: 902 });
  if (!regex.test(req.body.mobile))
    return res
      .status(400)
      .send({ message: "Invalid mobile number", status: 902 });
  if (!req.body.password)
    return res.status(400).send({ message: "No password given", status: 600 });
  const user = await User.findOne({ where: { mobile: req.body.mobile } });
  if (!user)
    return res
      .status(401)
      .send({ message: "Invalid mobile and or password", status: 005 });
  const correctPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!correctPassword)
    return res
      .status(401)
      .send({ message: "Invalid mobile and or password", status: 005 });
  const token = jwt.generateToken(user);
  res.header("x-auth-token", token).status(200).send(token);
};

exports.postLoginWithOtp = async (req, res) => {
  var regex = new RegExp("^(\\+98|0)?9\\d{9}$");
  if (!req.body.mobile)
    return res.status(400).send({ message: "No mobile", status: 902 });
  if (!regex.test(req.body.mobile))
    return res
      .status(400)
      .send({ message: "Invalid mobile number", status: 902 });
  if (!req.body.otp_code)
    return res
      .status(400)
      .send({ message: "No otp code provided", status: 312 });
  const user = await User.findOne({ where: { mobile: req.body.mobile } });
  if (!user)
    return res
      .status(400)
      .send({ message: "No user find with given mobile", status: 323 });
  if (user.otp_code.toString() === req.body.otp_code) {
    const token = jwt.generateToken(user);
    res.header("x-auth-token", token).status(200).send(token);
  } else if (user.otp_code !== req.body.otp_code) {
    res.status(401).send({ message: "Invalid otp code", status: 322 });
  }
  res.status(500).send({ message: "Unknown error", status: 312 });
};

exports.getUserMatches = async (req, res) => {
  if (!req.user)
    return res.status(400).send({ message: "No req.uesr", status: 323 });
  const matches = await sequelize.query(
    `SELECT m.*,t.* FROM matches m LEFT JOIN themes t USING (theme_id) JOIN participants USING(match_id) WHERE user_id = ${req.user.user_id}`,
    { type: QueryTypes.SELECT }
  );
  res.send(matches);
};
