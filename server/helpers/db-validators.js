const { User } = require("../models");

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

module.exports = {
    isEmailAvailable,
    isPasswordValid
};
