const FinishedFileds = require("../models/finishedfileds");
const MatchFildes = require("../models/matchFildes");
const User = require("../models/user");

module.exports.uploadFiled = async (req, res) => {
  if (!req.body.user_id)
    return res
      .status(400)
      .send({ message: "No user_id provided", status: 323 });
  if (!req.body.match_filed_id)
    return res
      .status(400)
      .send({ message: "No match_filed_id provided", status: 323 });
  const matchFildes = await MatchFildes.findByPk(req.body.match_filed_id);
  if (!matchFildes)
    return res
      .status(400)
      .send({ message: "Invalid match_filed_id", status: 232 });
  const user = await User.findByPk(req.body.user_id);
  if (!user)
    return res.status(400).send({ message: "Invalid user_id", status: 232 });
  console.log(req.files.data);
  if (!req.files.data)
    return res.status(400).send({ message: "No file given", status: 312 });
  if (req.files.data.size > 15999999)
    return res
      .status(400)
      .send({ message: "To large file (max:16MB)", status: 323 });
  try {
    await FinishedFileds.create({
      user_id: req.body.user_id,
      match_filed_id: req.body.match_filed_id,
      data: req.files.data.data,
    });
    return res
      .status(201)
      .send({ message: "finished filed created.", status: 323 });
  } catch (error) {
    res.status(400).send({
      message: "Failed to finished filed",
      status: 522,
      data: error.errors,
    });
  }
};
