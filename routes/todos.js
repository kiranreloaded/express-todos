import TodosController from '../controllers/Todos';

const express = require('express');

const router = express.Router();

router.post('/', TodosController.post);
router.get('/', TodosController.get);
// router.patch('/:id', TodosController.patchById);
router.get('/:id', TodosController.getById);
router.delete('/:id', TodosController.deleteById);

module.exports = router;
