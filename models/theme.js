const { DataTypes } = require("sequelize");
const sequelize = require("../tools/database");

const Match = require("./match");

const Theme = sequelize.define(
  "Theme",
  {
    theme_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    primary_background: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    secondary_background: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    primary_text: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    secondary_text: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  { tableName: "themes" }
);
module.exports = Theme;
