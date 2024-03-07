const AuthControler = require('../controlers/AuthControler.ts');
// const auth_router = require('express').Router();
const AuthRequests = require('../requests/AuthRequests.ts');
import {Router} from 'express';

const router = Router();

router.post('/login', AuthRequests.login, AuthControler.login);
// router.post('/login', AuthControler.login);

module.exports = router