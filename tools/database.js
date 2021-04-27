const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("matchito", "root", "25251818Amin@#", {
  dialect: "mysql",
});

module.exports = sequelize;
