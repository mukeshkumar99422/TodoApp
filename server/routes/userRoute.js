const express = require('express');
const { registerController, loginController } = require('../controllers/userController');
const router = express.Router();


//register route
router.post('/register',registerController);  //when a post request is made to .../register, the registerController function will be called

//login route
router.post('/login',loginController);
module.exports=router;