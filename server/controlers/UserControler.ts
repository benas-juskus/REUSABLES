const express = require('express');
import { validationResult } from 'express-validator'
import { Request, Response } from 'express';
import { log } from 'console';
const UserModel = require('../models/UserModel.ts')
const bcryptjs = require('bcryptjs');

const UserControler = {
    show: async (req: Request ,res: Response) => {
        const data = req.body;
        console.log("data", data);
        
        try {
            const user = await UserModel.showOne(data)
            if (user) {
                //here logic to check if token is ok then show user
                res.json(user)
            } else {
                res.json({message: 'user not found'})
            }
        } catch (error) {
            console.log(error);
            res.json({message: error})
        }
    },
    showAll: async (req: Request ,res: Response) => {
        try {
            const users = await UserModel.showAll()
            res.json(users)
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error})
        }
    },
    createUser: async (req: Request ,res: Response) => {
        const data = req.body;
        const hashedPassword = await bcryptjs.hash(data.password, 10);
        data.password = hashedPassword;

        const errorMessages = validationResult(req);

        if (!errorMessages.isEmpty()) {
            const errorMsg = errorMessages.array();
            // const errorMsg = errorMessages.array().map(error => error.msg);
            return res.status(400).json({ errors: errorMsg });
        } else {
            try {
                const user = await UserModel.showOne(data);
                if (user) {
                    if (user.username == data.username) {
                        res.status(403).json({
                            message: 'User with this username already exists, please use another username'
                        });
                    } else if (user.email == data.email) {
                        res.status(403).json({
                            message: 'User with this email already exists'
                        });
                    } else res.status(403).json({message: 'User already exists'})
                } else {                
                    const new_user = await UserModel.create(data);
                    res.status(200).json({user: new_user, message: 'User created successfully'});
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({message: error});
            }
        }
    },
    update: async (req: Request ,res: Response) => {
         res.json({message: 'user updated'})
    }
}

module.exports = UserControler