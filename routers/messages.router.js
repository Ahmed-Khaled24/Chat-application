const {Router} = require('express');
const {
    addNewMessage,
    getAllMessages,
    deleteMessage,
} = require('../controllers/messages.controller')

const messagesRouter = new Router();

messagesRouter.route('/')
.get(getAllMessages)
.post(addNewMessage)
.delete(deleteMessage)



module.exports = messagesRouter;