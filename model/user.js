const monogoose = require('mongoose'),
      Schema = monogoose.Schema;
      bcrypt = require('bcrypt');

let  userSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = monogoose.model('User', userSchema);

module.exports.getUserById = (id, callback)=>{
    User.findById(id, callback);
}

module.exports.getUserByUserName = (username, callback)=>{
    let query = { username: username };
    User.findOne(query, callback);
}

module.exports.addUser = (newUser, callback)=>{
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err)
                throw err;
            else
                {
                    newUser.password = hash;
    
                    newUser.save((err, user)=>{
                        if(err)
                            return callback( err, null);
                        else 
                        return callback(null, user);
                    })
                }
        })
    })
}

module.exports.comparePassword = (candidatePassword, hash, callback)=>{
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
        if(err)
            throw err;
        else
            callback(null, isMatch);
    })
}