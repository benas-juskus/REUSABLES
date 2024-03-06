const UserController = require('../controlers/UserControler.ts');
const express = require('express');
const  router  = express.Router();
const userValidations = require('../requests/UserRequests.ts');




    router.post('/create', userValidations.createUser, UserController.createUser);
    router.post('/show', UserController.show);
    router.post('/showall', UserController.showAll);
    // router.get('/users/:id', UserController.getUser);
    // router.put('/users/:id', UserController.updateUser);
    // router.delete('/users/:id', UserController.deleteUser);

module.exports = router

