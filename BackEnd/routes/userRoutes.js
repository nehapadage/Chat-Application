const express=require('express');
const routes=express.Router()
const userController = require('../controller/userController');

    console.log("In userRoutes");
    

    // Create a new user
    routes.post('/register', userController.createUser);
    

     // Login
     routes.post('/login', userController.login);

     // Forget Password
     routes.post('/forgetPassword', userController.forgetPassword);

    // Reset Password
    routes.post('/resetPassword',userController.resetPassword);

    
    

    module.exports=  routes;