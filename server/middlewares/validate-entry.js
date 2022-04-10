const { Entry } = require('../models')

const validateEntry = async(req, res, next) => {
  const entryId = req.params.id;
  const {id: userId} = req.user;

  const entry = await Entry.findByPk(entryId)

  if (!entry) {
    return res.status(404).json({
      msg: 'Entry does not exist'
    })
  }

  if (entry.userId !== userId) {
    return res.status(401).json({
        msg: 'You are not allowed'
    })
}
  
  next();
}

module.exports = validateEntry