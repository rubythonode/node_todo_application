const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.todo_list);
router.get('/:id', controller.todo_list_query);

router.post('/', controller.todo_create);

router.delete('/:id', controller.todo_remove);

router.put('/:id', controller.todo_update);
router.put('/completed/:id', controller.todo_completed);

router.get('/more/:id', controller.todo_more);
router.get('/real/:id', controller.todo_real);

module.exports = router;
