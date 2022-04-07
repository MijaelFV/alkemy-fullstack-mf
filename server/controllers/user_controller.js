const { User } = require('../models');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");

const getUser = async( req , res ) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk( id );
  
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Contact the administrator'
    })  
  }
}

const postUser = async( req , res ) => {
  let { name, email, password } = req.body;
  
  email = email.toLowerCase();
  
  try {
    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    password = bcryptjs.hashSync(password, salt);
          
    const user = User.build({name, email, password});

    await user.save();

    // JsonWebToken
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({user, token});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Contact the administrator'
    })    
  }
}

const putUser = async( req , res ) => {
  const { id }   = req.params;
  let { name, email, password } = req.body;
  
  try {
    const user = await User.findByPk( id );

    if (email) {
      email = email.toLowerCase();
    }
    
    if (password)  {
      const salt = bcryptjs.genSaltSync();
      password = bcryptjs.hashSync(password, salt)
    }

    const data = {
      name: name || user.name,
      email: email || user.email,
      password: password || user.password
    }

    await user.update(data);
    res.status(200).json( user );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Contact the administrator'
    })    
  }   
}

const deleteUser = async( req , res ) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk( id );

    await user.destroy();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Contact the administrator'
    }) 
  }
}

module.exports = {
  getUser,
  putUser,
  postUser,
  deleteUser
}