const jwt = require('jsonwebtoken'),
      config = require('../config/databse'),
      User = require('../model/user'),
      isEmpty = require('../validation/is-empty');

let userLogin = (req, res)=>{
    const { email, password } = req.body;

    User
    .findOne({email: email})
    .then(user=>{
        if(isEmpty(user)){
            return res.status(404).json({
                success: false,
                message: 'User doesn\'t exists'
            })
        }
        else{
            User.comparePassword(password, user.password, (err, match)=>{
                if(err){

                }
                else if(match){
                    let token = jwt.sign(user.toJSON(), config.secret, {expiresIn: config.tokenexp});
                    return res.status(202).json({success: true, token, user});
                }
                else{
                    return res.status(404).json({
                        success: false,
                        message: 'password don\'t match'
                    });
                }
            })
        }
    })
}

let userAuthenticate = (req, res, next) =>{
                let token = req.body.token || req.headers['authorization'];;

                if(token){
                    jwt.verify(token, config.secret, (err, decoded)=>{
                        if(err){
                            res.status(400).json({
                                message: err
                            })
                        }
                        else{
                            req.decoded = decoded;
                            next();
                        }
                    })
                }
                else{
                    return res.status(400).json({
                        success: false,
                        message: 'You haven\'t given toke'
                    })           
                }
        }

module.exports = {
    userLogin,
    userAuthenticate
}