
const User = require('../models/UserModel')





const UserControler = {
    createUser: (req,res) => {
        const data = req.body;
        console.log("role ID",typeof data.role_id);
        console.log(data);
        res.json(data)
        User.create(data)

    },
    test: (req,res) => {
        // console.log("testas");
        res.json("testas");
    }
}

module.exports = UserControler