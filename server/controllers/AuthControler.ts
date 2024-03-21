const express = require('express');
import { validationResult } from 'express-validator'
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';
const UserModel = require('../models/UserModel.ts')
const bcryptjs = require('bcryptjs');
const UserControler = require('./UserControler.ts')
const createToken  = require('./create_token.ts')

// const { dataValidation } = require('../controlers/UserControler.ts');

const prisma = new PrismaClient();

// const createToken = () => require('crypto').randomBytes(64).toString('hex')


interface Auth {
    email?: string;
    password?: string;
};

function dataValidation (req: Request) {
    const errorMessages = validationResult(req);
    
    if (!errorMessages.isEmpty()) {
        const errorMsg = errorMessages.array();
        // const errorMsg = errorMessages.array().map(error => error.msg);  // <==== Use to send JUST the error messages in response
        return errorMessages
    } else {
        return true
    }
}


const AuthControler = {
    login: async (req: Request, res: Response) => {
        const data = req.body;
        
        const validation = dataValidation(req);
        
        if (validation !== true) {
            return res.status(400).json({validation});
        } else {
            try {
                const user = await UserModel.showOne(data);
                if (!user) {
                    res.status(404).json({message: 'User with this email does not exist', errorFor: 'email'});
                } else {
                    try {
                        const passMatch = await bcryptjs.compare(data.password, user.password);
                        if ( passMatch ){
                            //logika istrinti sena tokena is db su vienodu device'u
                            const checkToken = await prisma.tokens.deleteMany({
                                where: {
                                    user_id: user.id,
                                    device: String(req.headers['user-agent'])
                                }
                            })
                            console.log(req.headers['user-agent']);
                            const deviseData = req.headers['user-agent'];
                            const token = await prisma.tokens.create({
                                data: {
                                    user_id:  user.id,
                                    token: createToken(3600),
                                    device: String(deviseData)
                                }
                            })
                            res.status(200).json({user, message: 'user is logged in', passMatch, token});
                        } else {
                            res.status(404).json({message: 'Wrong password', errorFor: 'password'});
                        }
                    } catch (error) {
                        console.log(error);
                        res.status(500).json({message: error});
                    }
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({message: error});
            }
        }
    },
    logout: async (req: Request, res: Response) => {
        const user_id = parseInt(req.params.id); 
        const deviseData = req.headers['user-agent'];
        try {
            await prisma.tokens.deleteMany({
                where: {
                    AND: [
                        { user_id: user_id },
                        { device: deviseData }
                    ]
                }
            })
            res.status(200).json({message: 'User was logged out!'});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error});
        }
    },
    logoutAllDevices: async (req: Request, res: Response) => {
        const user_id = parseInt(req.params.id);
        
        try {
            await prisma.tokens.deleteMany({
                where: {
                        user_id: user_id 
                }
            })
            res.status(200).json({message: 'User was logged out from all devices!'});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error});
        }
    },
    authToken: async (req: Request, res: Response) => {
        const usrToken = req.body.token
        const user_id = req.body.id
        try {
            const token = await prisma.tokens.findFirst({
                where: {
                    user_id: user_id,
                    device: String(req.headers['user-agent'])
                }
            })
            if (token) {
                console.log("userio tokenas",usrToken);
                console.log("DB tokenas",token.token);
                console.log("yra tokenas",token);
                if (token.token === usrToken) {
                    res.status(200).json({auth: true});
                } else {
                    res.status(404).json({auth: false});
                }
            } else {
                res.status(404).json({message: 'Token not found', auth: false});
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error});
        }
    },
    register: UserControler.createUser
}

module.exports = AuthControler