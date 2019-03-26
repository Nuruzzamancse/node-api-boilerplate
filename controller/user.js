let User = require('../model/user'),
    isEmpty = require('../validation/is-empty');

let createUser = (req, res)=>{
    const { name , email, username, password } = req.body;

    let newUser = new User({
        name: name,
        email: email,
        username: username,
        password: password
    });

    User.addUser(newUser, (err, user)=>{
        if(err){
            res.status(404).json({
                'message': err
            })
        }
        else{
            res.status(201).json({
                success: true,
                user
            })
        }
    })
}

let getSingleUser = (req, res)=>{
    User
    .findById(req.params.id)
    .then(user=>{
        if(isEmpty(user)){
            return res.status(404).json({
                success: false,
                message: 'Not found'
            })
        }
        return res.status(200).json({
            success: true,
            data: user
        })
    })
}

module.exports = {
    createUser,
    getSingleUser
}