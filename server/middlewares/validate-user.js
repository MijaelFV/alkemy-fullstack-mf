const { User } = require("../models");

const validateUser = (req, res, next) => {
    const userIdRequest = req.params.id;
    const {id: userIdToken} = req.user;

    const user = User.findByPk(userIdRequest);

    if (!user) {
      return res.status(404).json({
        msg: 'User does not exist'
      })
    }

    if (userIdToken != useridRequest) {
        return res.status(401).json({
            msg: 'You are not allowed'
        })
    }
    
    next();
}

module.exports = validateUser