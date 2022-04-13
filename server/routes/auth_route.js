const { check } = require('express-validator');
const { Router } = require('express');
const { authController } = require("../controllers");
const { validateJwt, validateFields } = require("../middlewares");

const router = Router();

router.post('/login',[
  check('email', 'The email does not have a valid format')
    .isEmail(),
  check('password', 'Password is not valid')
    .not().isEmpty(),
  validateFields
], authController.login);

router.get('/renew',[
  validateJwt,
], authController.renewToken);

module.exports = router;
