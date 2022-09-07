const {Router} = require('express');
const {
    addNewUser,
    getUserById,
} = require('../controllers/users.controller');

const usersRouter = new Router();

usersRouter.route('/')
.post(addNewUser)

usersRouter.route('/:userId')
.get(getUserById)


module.exports = usersRouter;