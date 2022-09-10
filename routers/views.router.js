const {Router} = require('express');
const passport = require('../config/passport.config');
const path = require('path');

const viewsRouter = Router();

function checkLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        res.redirect('/login');
    }
}

viewsRouter.route('/login')
.get( (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect('/chat-room');
    } else {
        next();
    }
}, (req, res) => {
    res.render('login');
})
.post( passport.authenticate('local'), (req, res) => {
    return res.status(200).json('authorized')
});



viewsRouter.route('/signup')
.get((req, res) => {
    res.render('signup')
})



viewsRouter.route('/chat-room')
.get(checkLoggedIn, (req, res) => {
    res.send('CHAT ROOM PAGE');
})



viewsRouter.route('/my-account')
.get(checkLoggedIn, (req, res) => {
    res.send('ACCOUNT PAGE');
})


module.exports = viewsRouter;