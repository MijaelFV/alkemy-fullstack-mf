const { Router } = require('express');
const { check } = require("express-validator");
const { categoryController } = require("../controllers");
const { validateJwt, validateFields, validateCategory } = require("../middlewares");

const router = Router();

router.get('/',[
  validateJwt,
], categoryController.getAllCategories);

router.put('/:id',[
  validateJwt,
  validateCategory,
], categoryController.putCategory);

router.post('/',[
  validateJwt,
  check('name', 'Name is required').not().isEmpty(),
  validateFields
], categoryController.postCategory);

router.delete('/:id',[
  validateJwt,
  validateCategory,
], categoryController.deleteCategory);

module.exports = router;
