import { body } from 'express-validator'

module.exports = {
    createUser: [
        body('username')
            .trim()
            .escape()
            .notEmpty().withMessage("Please enter a username")
            .isLength({ min: 5 }).withMessage("Username must be at least 5 characters long"),
        body('email')
            .trim()
            .escape()
            .notEmpty().withMessage("Please enter an email")
            .isEmail().withMessage("Please enter a valid email"),
        body('password') 
            .trim()
            .escape()
            .notEmpty().withMessage("Please enter a password")
            .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
            // to be added mode validations if needed (special chars, numbers... etc)
            // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).withMessage("Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number"),
        body('confirmPassword')
            .trim()
            .escape()
            .custom((value, { req }) => {
                return value === req.body.password;
            }).withMessage("Passwords don't match"),
    ],
    updateUser: [
        body('username')
            .optional()
            .trim()
            .escape()
            .notEmpty().withMessage("Please enter a username")
            .isLength({ min: 5 }).withMessage("Username must be at least 5 characters long"),
        body('email')
            .optional()
            .trim()
            .escape()
            .notEmpty().withMessage("Please enter an email")
            .isEmail().withMessage("Please enter a valid email"),
        body('password') 
            .optional()
            .trim()
            .escape()
            .notEmpty().withMessage("Please enter a password")
            .isLength({ min: 8 }).withMessage("Password must be at least 5 characters long"),
            // to be added mode validations if needed (special chars, numbers... etc)
            // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).withMessage("Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number"),
        body('confirmPassword')
            .optional()
            .trim()
            .escape()
            .custom((value, { req }) => {
                return value === req.body.password;
            }).withMessage("Nesutampa slaptažodžiai"),
    ]
}