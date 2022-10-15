const passport = require('passport');
const localStrategy = require('passport-local');
const {
    db_getUserById,
    db_getUserByEmail,
} = require('../models/users/users.model');
const {
    validatePassword,
} = require('../util/password.util')

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser( async (userId, done) => {
    try{
        const user = await db_getUserById(userId);
        done(null, user);
    } catch(err){
        done(err);
    }
});

// LOCAL STRATEGY
const localOptions = {
    usernameField: 'email',
    passportField: 'password',
}
async function localVerify(email, password, done){
    try {
        const user = await db_getUserByEmail(email);
        if(!user) {  // user doesn't exist in the database.
            return done(null, false);
        }
        else {
            if(await validatePassword(password, user.password)) {
                return done(null, user); // user exists and has valid credentials.
            } else {
                return done(null, false); // user exists put doesn't have valid credentials.
            }
        }
    } catch(err){
        done(err);
    }
}

passport.use(new localStrategy(localOptions, localVerify));


module.exports = passport;