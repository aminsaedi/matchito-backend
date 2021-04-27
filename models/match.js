const { DataTypes } = require("sequelize");
const sequelize = require("../tools/database");

const Referee = require("./referee");
const Theme = require("./theme");

const Match = sequelize.define(
  "Match",
  {
    match_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    referee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    theme_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    start_date: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    end_date: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  { tableName: "matches" }
);


module.exports = Match;
