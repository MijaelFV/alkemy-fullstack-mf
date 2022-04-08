const jwt = require('jsonwebtoken');
const User = require('../models/user_model');

const validateJWT = async(req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
        msg: 'There is no token in the request'
    })
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY || 's3cr37k3yof4lk3mych4ll3ng3');

    const user = await User.findByPk(id)
    if (!user) {
        return res.status(401).json({ 
            msg: 'Invalid token - user does not exist'
        })
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Invalid token'
    })
  }
}

module.exports = validateJWT