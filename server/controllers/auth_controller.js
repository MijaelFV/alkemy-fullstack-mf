const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");
const { User } = require("../models");

const renewToken = async(req, res) => {
  const {id, name} = req.user;
  const token = await generateJWT(id, name);
  
  const checkedUser = {
      token,
      id,
      name
  }

  res.status(200).json(checkedUser);
} 

const login = async(req, res) => {
  const {email, password}  = req.body;
  
  try {
    const user = await User.findOne({
      where: {
        email
      }
    })
    
    if (!user) {
      return res.status(400).json({
        msg: 'The email entered does not belong to a user'
      })
    }

    const isPasswordValid = bcryptjs.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            msg: 'Password is incorrect'
        })
    }
  
    const token = await generateJWT(user.id, user.name);
  
    const loggedUser = {
      token,
      id: user.id,
      name: user.name
    }
    res.status(200).json(loggedUser)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Contact the administrator'
    }) 
  }

}

module.exports = {
  renewToken,
  login
}