const jwt = require('jsonwebtoken');

const generateJWT = (id = '', name = '') => {
    return new Promise((resolve,reject) => {
         const payload = {id, name};

         jwt.sign(payload, process.env.SECRET_KEY || 's3cr37k3yof4lk3mych4ll3ng3', {
             expiresIn: '999h'
         }, (err, token) => {
             if ( err ) {
                 console.log(err);
                 reject('There was an error when trying to generate the JWT')
             } else {
                 resolve(token);
             }
         })
    }) 
}

module.exports = {
    generateJWT
}