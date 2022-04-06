const { User } = require('../models');
const bcryptjs = require('bcryptjs');

const getUser = async( req , res ) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk( id );
    if ( !user ) {
      res.status(404).json({
        msg: `The user does not exist ${ id }`
      });
    }
  
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
    // Check if there is a user using this email
    // const emailExists = await User.findOne({
    //     where: {
    //         email: body.email
    //     }
    // });
    // if (emailExists) {
    //     return res.status(400).json({
    //         msg: `This email is already in use ${email}`
    //     });
    // };
    
    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    password = bcryptjs.hashSync(password, salt);
          
    const user = User.build({name, email, password});

    await user.save();

    res.status(201).json( user );
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
  
  if (email) {
    email = email.toLowerCase();
  }
  
  try {
    if (password)  {
      const salt = bcryptjs.genSaltSync();
      password = bcryptjs.hashSync(password, salt)
    }

    const user = await User.findByPk( id );
    if ( !user ) {
        return res.status(404).json({
            msg: `The user does not exist ${ id }`
        });
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
    if ( !user ) {
      return res.status(404).json({
        msg: `The user does not exist ${ id }`
      });
    }

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