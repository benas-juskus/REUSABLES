const express = require('express');
import { validationResult } from 'express-validator'
import { Request, Response } from 'express';
const UserModel = require('../models/UserModel.ts')
const bcryptjs = require('bcryptjs');
// const { dataValidation } = require('../controlers/UserControler.ts');


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
        // console.log("1");
        
        const validation = dataValidation(req);
        
        if (validation !== true) {
            // console.log("2");
            return res.status(400).json({validation});
        } else {
            try {
                // console.log("3");
                const user = await UserModel.showOne(data);
                if (!user) {
                    res.status(404).json({message: 'User with this email does not exist'});
                } else {
                    try {
                        // console.log("4");
                        const passMatch = await bcryptjs.compare(data.password, user.password);
                        if ( passMatch){
                            // console.log("5");
                            res.status(200).json({user, message: 'user is logged in', passMatch: true});
                        } else {
                            res.status(404).json({message: 'Wrong password'});
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

    }
}

module.exports = AuthControler