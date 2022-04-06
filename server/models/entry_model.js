const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Entry = db.define('Entry', {
  concept: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Entry.sync()

module.exports = Entry