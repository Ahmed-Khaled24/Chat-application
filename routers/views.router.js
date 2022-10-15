const {Router} = require('express');
const passport = require('passport');
const path = require('path');
const checkLoggedIn = require('../middlewares/checkLoggedIn');
const viewsRouter = Router();


viewsRouter.route('/')
.get((req, res) => {
    res.redirect('/login');
})

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



viewsRouter.route('/signup')
.get((req, res) => {
    res.render('signup')
})


viewsRouter.route('/chat-room')
.get(checkLoggedIn, (req, res) => {
    res.render('chat');
})


viewsRouter.route('/profile')
.get(checkLoggedIn, (req, res) => {
    res.render('profile', {user: req.user});
})


viewsRouter.route('/logout')
.get((req, res) => {
    req.logout( (err) => {
        if(err) console.log(err.message);
    });
    return res.redirect('/login');
})


viewsRouter.route('/*')
.get((req, res) => {
    res.status(404).send('NOT FOUND 404');
})


module.exports = viewsRouter;