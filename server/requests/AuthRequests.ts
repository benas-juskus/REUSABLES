import { body } from 'express-validator'

module.exports = {
    login: [
        body('email')
            .trim()
            .escape()
            .notEmpty().withMessage("Please enter an email")
            .isEmail().withMessage("Please enter a valid email"),
        body('password') 
            .trim()
            .escape()
            .notEmpty().withMessage("Please enter a password")
    ],
}

