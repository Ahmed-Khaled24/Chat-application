const User = require('./users.mongo');

async function db_addNewUser(user){
    try {
        return User.create(user);
    } catch(err){
        throw err;
    }
}

async function db_getUserById(id){
    try {
        return User.findById(id);
    } catch(err){
        throw err;
    }
}

async function db_getUserByUsername(username){
    try {
        return User.findOne({username: username});
    } catch(err){
        throw err;
    }
}

async function db_getUserByEmail(email){
    try {
        return User.findOne({email: email});
    } catch(err){
        throw err;
    }
}

async function db_updateUser(userId, update){
    try {
        await User.updateOne({_id: userId}, update);
    } catch(err) {
        throw err;
    }
}

module.exports = {
    db_addNewUser,
    db_getUserById,
    db_getUserByUsername,
    db_getUserByEmail,
    db_updateUser
}