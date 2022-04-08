const { User, Entry } = require("../models");

const isEmailAvailable = async(email = '') => {
    const user = await User.findOne({
        where: {
            email
        }
    });

    if (user) {
        throw new Error(`Email is already in use`)
    }
};

const userExists = async(id = '') => {
  const user = await User.findByPk( id );
  if (!user) {
      throw new Error(`User does not exist`);
  }
};

const entryExists = async(id = '') => {
  const entry = await Entry.findByPk( id );

  if (!entry) {
      throw new Error(`Entry does not exist`);
  }
};

const isPasswordValid = ({password, password2}) => {
  if (!password) {
    throw new Error('Password is required')
  }

  if (password.length < 6) {
    throw new Error('Password must have a minimum length of 6 characters')
  }

  if (!password2) {
    throw new Error('Must confirm pasword')
  }

  if (password !== password2) {
    throw new Error('Passwords should be the same')
  }

  return password
}

const emailExists = async(email = '') => {
    const user = await User.findOne({
        where: {
            email
        }
    });
    if (!user) {
        throw new Error(`The email entered does not belong to a user`)
    }
};

module.exports = {
    isEmailAvailable,
    isPasswordValid,
    userExists,
    emailExists,
    entryExists
};
