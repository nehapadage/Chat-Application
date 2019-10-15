const express=require('express');
const routes=express.Router()
const userController = require('../controller/userController');

    // Create a new user
    routes.post('/users', userController.createUser);
    

    // // Retrieve all users
    // app.get('/users', userController.findAll);

    // // Retrieve a single user with userId
    // app.get('/users/:usersId', userController.findOne);

    // // Update a user with userId
    // app.put('/users/:usersId', userController.update);

    // // Delete a user with userId
    // app.delete('/users/:usersId', userController.delete);

    module.exports=routes;