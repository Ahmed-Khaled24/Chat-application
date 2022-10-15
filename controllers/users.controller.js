const {
    db_addNewUser,
    db_getUserById,
    db_getUserByUsername,
    db_getUserByEmail,
} = require('../models/users/users.model')
const { encrypt } = require('../util/password.util');
const { validateEmail } = require('../util/email.util');

async function addNewUser(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    
    try {
        var emailValidation = await validateEmail(email);
    } catch(err){
        return res.status(500).json({
            status: 'fail',
            error: err.message,
        })
    }

    if(emailValidation.status !== 'success' || emailValidation.classification !== 'deliverable'){
        return res.status(400).json({
            status: 'fail',
            error: `the email you entered doesn't exist please use a REAL email`,
        })
    }

    const user = {
        firstName,
        lastName,
        username,
        email,
        password: await encrypt(password),
        createdAt: new Date(),
    }

    try{
        await db_addNewUser(user);
        return res.status(201).json({
            status: 'success',
        })
    } catch(err){
        return res.status(500).json({
            status: 'fail',
            error: err.message,
        })
    }
}

async function getUserById(req, res){
    const userId = req.params.userId;
    try{
        const user = await db_getUserById(userId);
        return res.status(200).json({
            status: 'success',
            user: user,
        });
    } catch(err){
        return res.status(500).json({
            status: 'fail',
            error: err.message,
        })
    }
}


module.exports = {
    addNewUser,
    getUserById,
}