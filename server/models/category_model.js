const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Category = db.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category