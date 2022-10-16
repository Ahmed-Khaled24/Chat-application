const {Router} = require('express');
const {
    addNewUser,
    getUserById,
    updateUser,
} = require('../controllers/users.controller');
const checkLoggedIn = require('../middlewares/checkLoggedIn');

const usersRouter = new Router();

usersRouter.post('/', addNewUser)
usersRouter.get('/:userId', getUserById)
usersRouter.post('/update', checkLoggedIn, updateUser)

module.exports = usersRouter;