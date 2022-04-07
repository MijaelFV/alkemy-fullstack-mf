const { Router } = require('express');
const { check, body } = require('express-validator');
const { userController } = require("../controllers");
const { isEmailAvailable, userExists, isPasswordValid } = require("../helpers/db-validators");
const { validateFields, validateJwt, validateUserOwn } = require("../middlewares");

const router = Router();

router.get('/:id',[
  validateJwt,
  validateUserOwn,
  check('id').custom(userExists),
  validateFields
], userController.getUser);

router.put('/:id',[
  validateJwt,
  validateUserOwn,
  check('id').custom(userExists),
  validateFields
], userController.putUser);

router.post('/',[
  check('name', 'Name is required').notEmpty().toLowerCase(),
  check('email', 'Email must be valid').isEmail(),
  check('email').custom(isEmailAvailable),
  body('password').custom((v, {req}) => isPasswordValid(req.body)),
  validateFields
], userController.postUser);

router.delete('/:id',[
  validateJwt,
  validateUserOwn,
  check('id').custom(userExists),
  validateFields
], userController.deleteUser);

module.exports = router;
