const passport = require('passport');
const localStrategy = require('passport-local');
const googleStrategy = require('passport-google-oauth20');
const {
    db_getUserById,
    db_getUserByEmail,
    db_addNewUser,
} = require('../models/users/users.model');
const { validatePassword } = require('../util/password.util')
const keys = require('../config/keys')

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

// Local
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

// Google Oauth20 
const googleOptions = {
    clientID: keys.google_client_id,
    clientSecret: keys.google_client_secret,
    callbackURL: keys.google_callback,
    scope: ['email', 'profile'],
}
async function googleVerify(accessToken, refreshToken, profile, done){
    const profileData = profile._json;
    let user = await db_getUserByEmail(profileData.email);
    
    if(user) {
        return done(null, user)
    }

    user = {    
        firstName: profileData.given_name,
        lastName: profileData.family_name,
        email: profileData.email,
        createdAt: new Date(),
        profileUrl: null,
    }

    try {
        await db_addNewUser(user);
    } catch(err){
        console.log(err.message);
    }
    done(null, user);
}
passport.use(new googleStrategy(googleOptions, googleVerify));
