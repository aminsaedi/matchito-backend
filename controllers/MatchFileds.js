const MatchFileds = require("../models/matchFildes");
const Match = require("../models/match");

module.exports.getMatchFileds = async (req, res) => {
  const fileds = await MatchFileds.findAll({
    where: { match_id: req.params.id },
  });
  res.send(fileds);
};

module.exports.addMatchFileds = async (req, res) => {
  if (req.user.type != "admin")
    return res.status(401).send({
      message: "Ony admin users are allow to create new match filed",
      status: 313,
    });
  if (!req.body.match_id)
    return res
      .status(400)
      .send({ message: "No match_id provided", status: 400 });
  const match = await Match.findOne({ where: { match_id: req.body.match_id } });
  if (!match) return res.status(400).send({ message: "Invalid match id" });
  try {
    await MatchFileds.create({
      match_id: req.body.match_id,
      title: req.body.title,
    });
    return res
      .status(201)
      .send({ message: "match filed created", status: 322 });
  } catch (error) {
    return res.status(500).send({
      message: "Failed to create match filed",
      status: 423,
      data: error.errors,
    });
  }
};
