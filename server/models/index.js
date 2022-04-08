const User = require('./user_model')
const Entry = require('./entry_model');

// Create asociations
User.hasMany(Entry, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: {name: 'userId', allowNull: false}
})
Entry.belongsTo(User, {foreignKey: {name: 'userId', allowNull: false}});
//

// Force database sync
// User.sync({force: true})
// Entry.sync({force: true})

module.exports = {
  User,
  Entry
};