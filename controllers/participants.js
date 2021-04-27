const Participants = require("../models/participant");
const User = require("../models/user");
const Match = require("../models/match");

module.exports.getMatchParticipants = async (req, res) => {
  if (!req.params.id)
    return res
      .status(400)
      .send({ message: "No match id provided", status: 243 });
  const match = await Match.findOne({
    where: { match_id: req.params.id },
  });
  if (!match)
    return res.status(400).send({ message: "Invalid match_id", status: 242 });

  try {
    const participants = await Participants.findAll({
      where: { match_id: req.params.id },
    });
    return res.send(participants);
  } catch (error) {
    return res.status(500).send({
      message: "Failed To get match participants",
      status: 423,
      data: error.errors,
    });
  }
};

module.exports.addParticipants = async (req, res) => {
  if (!req.body.user_id)
    return res
      .status(400)
      .send({ message: "No user_id provided", status: 343 });
  if (!req.body.match_id)
    return res
      .status(400)
      .send({ message: "No match_id provided", status: 343 });
  const user = await User.findOne({ where: { user_id: req.body.user_id } });
  if (!user)
    return res.status(400).send({ message: "Invalid user_id", status: 343 });
  const match = await Match.findOne({ where: { match_id: req.body.match_id } });
  if (!match)
    return res.status(400).send({ message: "Invalid match_id", status: 343 });
  try {
    await Participants.create({
      match_id: req.body.match_id,
      user_id: req.body.user_id,
    });
    return res.status(201).send({ message: "participants added", status: 231 });
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: "Failed to add participants",
      status: 423,
      data: error.errors,
    });
  }
};
