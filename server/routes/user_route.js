const { Router } = require('express');
const { check, body } = require('express-validator');
const { userController } = require("../controllers");
const { isEmailAvailable, isPasswordValid } = require("../helpers/db-validators");
const { validateFields, validateJwt, validateUser } = require("../middlewares");

const router = Router();

router.get('/:id',[
  validateJwt,
  validateUser,
], userController.getUser);

router.put('/:id',[
  validateJwt,
  check('name', 'Name is required')
    .notEmpty(),
  check('email', 'Email must be valid')
    .isEmail()
    .toLowerCase(),
  check('email')
    .custom(isEmailAvailable),
  body('password')
    .custom((v, {req}) => isPasswordValid(req.body)),
  validateUser,
], userController.putUser);

router.post('/',[
  check('name', 'Name is required')
    .notEmpty(),
  check('email', 'Email must be valid')
    .isEmail()
    .toLowerCase(),
  check('email')
    .custom(isEmailAvailable),
  body('password')
    .custom((v, {req}) => isPasswordValid(req.body)),
  validateFields
], userController.postUser);

router.delete('/:id',[
  validateJwt,
  validateUser,
], userController.deleteUser);

module.exports = router;
