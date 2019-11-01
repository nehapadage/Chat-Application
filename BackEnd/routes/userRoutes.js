const express = require('express');
const routes = express.Router()
const userController = require('../controller/userController');
const chatController=require('../controller/chatController');
const authentication=require('/home/admin1/Desktop/Neha_Programs/chatapp/BackEnd/utility/tokenGenerator.js')

console.log("In userRoutes");


// Create a new user
routes.post('/register', userController.createUser);

// Login
routes.post('/login', userController.login);

// Forget Password
routes.post('/forgetpassword', userController.forgetPassword);

// Reset Password
routes.post('/resetpassword',authentication.verifyToken,userController.resetPassword);

//Get All Users
routes.post('/getallusers',userController.getAllUsers);

// //Send Message
// routes.post('/sendmessage',chatController.sendMessage);

//Receive Messages
routes.post('/receivedmessages',chatController.receivedMessages)


module.exports = routes;