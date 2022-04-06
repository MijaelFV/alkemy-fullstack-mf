const { Router } = require('express');
const { entryController } = require("../controllers");

const router = Router();

router.get('/',[

], entryController.getAllEntries);

router.get('/:id',[

], entryController.getEntry);

router.put('/:id',[

], entryController.putEntry);

router.post('/',[

], entryController.postEntry);

router.delete('/:id',[

], entryController.deleteEntry);

module.exports = router;
