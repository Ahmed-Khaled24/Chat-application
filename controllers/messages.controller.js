const mongoose = require('mongoose')
const {
    db_addNewMessage,
    db_deleteMessage,
    db_getAllMessages,
    db_getMessageById
} = require('../models/messages/messages.model');

async function addNewMessage(req, res){
    const message = {
        _id: mongoose.Types.ObjectId(),
        content: req.body.content,
        createdAt: new Date(),
        createdBy: req.user.id,
    }

    try {
        await db_addNewMessage(message);
        return res.status(201).json({
            status: 'success',
            message: await db_getMessageById(message._id), // to populate createdBy path
        });
    } catch(err){
        return res.status(500).json({
            status: 'fail',
            error: err.message,
        })
    }
}

async function getAllMessages(req, res){
    try {
        const allMessages = await db_getAllMessages();
        return res.status(200).json({
            status: 'success',
            messages: allMessages,
        });
    } catch(err) {
        return res.status(500).json({
            status: 'fail',
            error: err.message,
        })
    }
}

async function deleteMessage(req, res){
    const messageId = req.body.id;
    try {
        await db_deleteMessage(messageId);
        return res.status(200).json({
            status: 'success',
        })
    } catch(err){
        return res.status(500).json({
            status: 'fail',
            error: err.message,
        })
    }
}

async function getMessageById(req, res){
    const messageId = req.params.id;
    try {
        const message = await db_getMessageById(messageId);
        return res.status(200).json({
            status: 'success',
            message,
        })
    } catch(err) {
        return res.status(500).json({
            status: 'fail',
            error: err.message
        })
    }
}

module.exports = {
    addNewMessage,
    getAllMessages,
    deleteMessage,
    getMessageById,
}