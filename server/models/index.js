const User = require('./user_model')
const Entry = require('./entry_model');
const Category = require('./category_model');
const { db } = require("../database/config");

// Create asociations
User.hasMany(Entry, {onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: {name: 'userId', allowNull: false}})
Entry.belongsTo(User, {foreignKey: {name: 'userId', allowNull: false}});

User.hasMany(Category, {onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: {name: 'userId', allowNull: false}})
Category.belongsTo(User, {foreignKey: {name: 'userId', allowNull: false}});

Category.hasMany(Entry, {onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: {name: 'categoryId'}})
Entry.belongsTo(Category, {foreignKey: {name: 'categoryId'}});

// Database sync
db.sync();

module.exports = {
  User,
  Entry,
  Category
};