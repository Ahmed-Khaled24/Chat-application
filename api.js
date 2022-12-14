const keys = require('./config/keys');
const express = require('express');
const passport = require('passport');
const session = require('cookie-session');
const messagesRouter = require('./routers/messages.router');
const usersRouter = require('./routers/users.router');
const viewsRouter = require('./routers/views.router');
const authRouter = require('./routers/auth.router')
const uploadRouter = require('./routers/upload.router')
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(session({
    name: 'Chat',
    secret: keys.session_secret, 
    cookie:{
        maxAge: 60 * 1000 * 1000 * 24,
    },
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/messages', messagesRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/upload', uploadRouter);
app.use('/', viewsRouter);

module.exports = app;