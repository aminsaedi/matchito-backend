const bcrypt = require("bcrypt");
const jwt = require("../utilities/jwt");
const config = require("config");

const Admin = require("../models/admin");

exports.postLogin = async (req, res) => {
  if (!req.body.username || !req.body.password)
    return res
      .status(400)
      .send({ message: "No username and or password provided", status: 312 });
  const admin = await Admin.findOne({ where: { username: req.body.username } });
  if (!admin)
    return res
      .status(401)
      .send({ message: "Invalid username and or password", status: 324 });
  const correctPassword = await bcrypt.compare(
    req.body.password,
    admin.password
  );
  if (!correctPassword)
    return res
      .status(401)
      .send({ messahe: "Invalid username and or password", status: 005 });
  const token = jwt.generateAdminToken(admin);
  res.header("x-auth-token", token).status(200).send(token);
};

exports.postRegister = async (req, res) => {
  if (req.body.motherPassword != config.get("motherPassword"))
    return res.status(401).send({
      message: "motherPassword is not provided or wrong",
      status: 313,
    });
  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash(req.body.password, salt);
  try {
    await Admin.create({
      username : req.body.username,
      password,
    });
    res.status(201).send({ message: "Admin created", status: 201 });
  } catch (error) {
    res.status(400).send({
      message: "Failed to create Admin",
      status: 300,
      data: error.errors,
    });
  }
};
