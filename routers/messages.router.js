const {Router} = require('express');
const {
    addNewMessage,
    getAllMessages,
    deleteMessage,
    getMessageById,
} = require('../controllers/messages.controller')

const messagesRouter = new Router();

messagesRouter.route('/')
.get(getAllMessages)
.post(addNewMessage)
.delete(deleteMessage)

messagesRouter.route('/:id')
.get(getMessageById)


module.exports = messagesRouter;