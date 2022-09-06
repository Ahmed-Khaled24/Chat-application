const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    name: 'KH-Chat',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET, 
    cookie:{
        maxAge: 60 * 1000 * 1000 * 24,
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    }),
}))
app.use(passport.initialize());
app.use(passport.session());


module.exports = app;