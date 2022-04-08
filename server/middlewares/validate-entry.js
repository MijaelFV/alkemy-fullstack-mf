const { Entry } = require('../models')

const validateEntryOwn = async(req, res, next) => {
  const entryId = req.params.id;
  const {id: userId} = req.user;

  const entry = await Entry.findByPk(entryId)

  if (entry?.userId !== userId) {
    return res.status(401).json({
        msg: 'You are not allowed'
    })
}
  
  next();
}

module.exports = validateEntryOwn