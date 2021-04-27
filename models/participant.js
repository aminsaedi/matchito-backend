const { DataTypes } = require("sequelize");
const sequelize = require("../tools/database");

const Participants = sequelize.define(
  "Participants",
  {
    participant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    match_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reg_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { tableName: "participants" }
);

module.exports = Participants;
