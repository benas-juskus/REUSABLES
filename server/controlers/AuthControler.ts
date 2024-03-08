const express = require('express');
import { validationResult } from 'express-validator'
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const UserModel = require('../models/UserModel.ts')
const bcryptjs = require('bcryptjs');
// const { dataValidation } = require('../controlers/UserControler.ts');

const prisma = new PrismaClient();

const createToken = () => require('crypto').randomBytes(64).toString('hex')


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
                            console.log(req.headers['user-agent']);
                            const deviseData = req.headers['user-agent'];
                            const token = await prisma.tokens.create({
                                data: {
                                    user_id:  user.id,
                                    token: createToken(),
                                    device: String(deviseData)
                                }
                            })
                            res.status(200).json({user, message: 'user is logged in', passMatch, token});
                            // res.status(200).json({user, message: 'user is logged in', passMatch: true});
                        } else {
                            res.status(404).json({message: 'Wrong password', errorFor: 'password'});
                            // res.json({message: 'Wrong password'});
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
        
    }
}

module.exports = AuthControler