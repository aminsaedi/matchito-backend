const { DataTypes } = require("sequelize");
const sequelize = require("../tools/database");

const FinishedFileds = sequelize.define(
  "FinishedFileds",
  {
    finished_filed_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    match_filed_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    data: {
      type: DataTypes.BLOB("medium"),
      allowNull: false,
    },
  },
  { tableName: "finished_fileds" }
);

module.exports = FinishedFileds;
