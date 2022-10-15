const {Router} = require('express');
const passport = require('passport')
const authRouter = Router();

authRouter.post('/local', passport.authenticate('local'), 
    (req, res) => {    
            return res.status(200).json('authorized')
    }
)

authRouter.get('/google', passport.authenticate('google'));
authRouter.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/chat-room',
    failureRedirect: '/login',
}))

module.exports = authRouter;