const Match = require("../models/match");
const Theme = require("../models/theme");
const Referee = require("../models/referee");

const { QueryTypes } = require("sequelize");
const sequelize = require("../tools/database");

const jalali = require("moment-jalaali");

module.exports.createMatch = async (req, res) => {
  if (
    !req.body.referee_id ||
    !req.body.theme_id ||
    !req.body.title ||
    !req.body.start_date
  )
    return res.status(400).send({ message: "Incomplete args", status: 322 });
  const theme = await Theme.findByPk(req.body.theme_id);
  if (!theme)
    return res.status(400).send({ messsage: "Invalid theme_id", status: 322 });
  const referee = await Referee.findByPk(req.body.referee_id);
  if (!referee)
    return res.status(400).send({ message: "Invalid refree id", status: 213 });
  try {
    await Match.create({
      referee_id: req.body.referee_id,
      theme_id: req.body.theme_id,
      title: req.body.title,
      description: req.body.description ? req.body.description : null,
      start_date: req.body.start_date,
      end_date: req.body.end_date ? req.body.end_date : null,
    });
    return res.status(201).send({ message: "Math created", status: 323 });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Failed to create match", status: 324, data: error });
  }
};

module.exports.getAllMatches = async (req, res) => {
  let matches = await sequelize.query(
    "SELECT m.*,t.*,r.name AS referee_name FROM matches m LEFT JOIN themes t USING(theme_id) LEFT JOIN referees r USING(referee_id) ",
    { type: QueryTypes.SELECT }
  );  return res.status(200).send(matches);
};

module.exports.getActiveMatches = async (req, res) => {
  const now = jalali().format("jYYYY/jMM/jDD");
  let matches = await sequelize.query(
    "SELECT m.match_id,m.title,m.description,m.start_date,m.end_date,t.*,r.name AS referee_name FROM matches m LEFT JOIN themes t USING(theme_id) LEFT JOIN referees r USING(referee_id) ",
    { type: QueryTypes.SELECT }
  );
  // let matches = await Match.findAll();
  matches = matches.filter((match) => {
    if (match.end_date) {
      if (match.start_date <= now) {
        if (match.end_date >= now) {
          return true;
        }
      }
    } else if (!match.end_date && match.start_date <= now) return true;
  });
  res.send(matches);
};
