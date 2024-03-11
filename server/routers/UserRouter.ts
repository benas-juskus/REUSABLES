const UserController = require('../controlers/UserControler.ts');
const express = require('express');
const  router  = express.Router();
const userValidations = require('../requests/UserRequests.ts');

router.post('/create', userValidations.createUser, UserController.createUser);
router.post('/show', UserController.show);
router.post('/showall', UserController.showAll);
router.put('/updatepass/:id', userValidations.updateUser, UserController.updatePassword);
router.put('/update/:id', userValidations.updateUser, UserController.update);
// router.put('/:id', userValidations.updateUser, UserController.update, UserController.updatePassword);
router.delete('/:id', UserController.destroy);

module.exports = router

