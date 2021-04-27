const { DataTypes } = require("sequelize");
const sequelize = require("../tools/database");

const MatchFileds = sequelize.define("MatchFileds", {
  match_filed_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  match_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
},{tableName:"match_fileds"});

module.exports = MatchFileds;
