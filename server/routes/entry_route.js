const { Router } = require('express');
const { check } = require("express-validator");
const { entryController } = require("../controllers");
const { validateJwt, validateFields, validateEntry } = require("../middlewares");

const router = Router();

router.get('/',[
  validateJwt,
], entryController.getAllEntries);

router.get('/:id',[
  validateJwt,
  validateEntry,
], entryController.getEntry);

router.put('/:id',[
  validateJwt,
  validateEntry,
], entryController.putEntry);

router.post('/',[
  validateJwt,
  check('concept')
    .not().isEmpty().withMessage('Concept is required')
    .isLength({min: 2}).withMessage('Must be at least 2 characters long'),
  check('amount')
    .not().isEmpty().withMessage('Amount is required')
    .isLength({min: 1}).withMessage('Must be at least 1 characters long'),
  check('type')
    .not().isEmpty().withMessage('Type is required')
    .isIn(['income', 'expense']).withMessage('The entry must be an income or an expense'),
  check('category')
    .not().isEmpty().withMessage('Category is required'),
  validateFields
], entryController.postEntry);

router.delete('/:id',[
  validateJwt,
  validateEntry,
], entryController.deleteEntry);

module.exports = router;
