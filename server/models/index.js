const User = require('./user_model')
const Entry = require('./entry_model')

// Create asociations
User.hasMany(Entry)
Entry.belongsTo(User);
//

// Force database sync
// User.sync({force: true})
// Entry.sync({force: true})

module.exports = {
  User,
  Entry
};