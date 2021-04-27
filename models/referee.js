const { DataTypes } = require("sequelize");
const sequelize = require("../tools/database");

const Match = require("./match");

const Referee = sequelize.define(
  "Referee",
  {
    referee_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  { tableName: "referees" }
);

module.exports = Referee;
