const express = require('express')
const router = express.Router()
const todos = require('./controllers/todos')

router.get('/todos', todos.index)
router.post('/todos', todos.store)
router.put('/todos/:id', todos.update)
router.delete('/todos/:id', todos.destroy)
router.post('/todos/sendToEmail', todos.sendToEmail)

module.exports = router