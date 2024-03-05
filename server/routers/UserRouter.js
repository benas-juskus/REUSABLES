const UserController = require('../controlers/UserControler');
const express = require('express');
const  router  = express.Router();




    router.get('/', UserController.createUser);
    // router.get('/users', UserController.getUsers);
    // router.get('/users/:id', UserController.getUser);
    // router.put('/users/:id', UserController.updateUser);
    // router.delete('/users/:id', UserController.deleteUser);

module.exports = router

