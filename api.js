const express = require('express');
const helmet = require('helmet');
const passport = require('./config/passport.config');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const messagesRouter = require('./routers/messages.router');
const usersRouter = require('./routers/users.router');
const viewsRouter = require('./routers/views.router');
const path = require('path');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
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
app.use('/messages', messagesRouter);
app.use('/users', usersRouter);
app.use('/', viewsRouter);

module.exports = app;