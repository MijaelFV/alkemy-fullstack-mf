const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Entry = db.define('Entry', {
  concept: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Entry