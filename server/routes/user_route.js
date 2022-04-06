const { Router } = require('express');
const { userController } = require("../controllers");

const router = Router();

router.get('/:id',[

], userController.getUser);

router.put('/:id',[

], userController.putUser);

router.post('/',[

], userController.postUser);

router.delete('/:id',[

], userController.deleteUser);

module.exports = router;
