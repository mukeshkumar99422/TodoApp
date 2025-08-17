const express=require('express');
const { createTodoController, getTodoController, deleteTodoController, updateTodoController } = require('../controllers/todoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router=express.Router();

//create todo
router.post('/create', authMiddleware, createTodoController);

//GET todo
router.get('/getAll/:userId',authMiddleware, getTodoController);

//:userId is a variable in url ~ route parameter
// express parses the url and gives in req.params: {userId: 123/id}

//delete todo
router.delete('/delete/:id',authMiddleware,deleteTodoController);

//update todo
router.put('/update/:id',authMiddleware,updateTodoController);

module.exports=router;