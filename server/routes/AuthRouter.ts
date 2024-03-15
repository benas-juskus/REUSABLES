const AuthControler = require('../controllers/AuthControler.ts');
// const auth_router = require('express').Router();
const AuthRequests = require('../requests/AuthRequests.ts');
const UserRequests = require('../requests/UserRequests.ts');
import {Router} from 'express';

const router = Router();

router.post('/login', AuthRequests.login, AuthControler.login);
router.delete('/logout/:id', AuthControler.logout);
router.delete('/logoutall/:id', AuthControler.logoutAllDevices);
router.post('/register', UserRequests.createUser, AuthControler.register);

module.exports = router