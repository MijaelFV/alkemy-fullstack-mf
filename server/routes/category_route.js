const { Router } = require('express');
const { categoryController } = require("../controllers");
const { validateJwt, validateFields } = require("../middlewares");

const router = Router();

router.get('/',[
  validateJwt,
  validateFields
], categoryController.getAllCategories);

router.put('/:id',[
  validateJwt,
  validateFields
], categoryController.putCategory);

router.post('/',[
  validateJwt,
  validateFields
], categoryController.postCategory);

router.delete('/:id',[
  validateJwt,
  validateFields
], categoryController.deleteCategory);

module.exports = router;
