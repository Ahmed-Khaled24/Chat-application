const Message = require('./messages.mongo');

async function db_addNewMessage(message){
    try {
        return await Message.create(message);
    } catch(err) {
        throw err; 
    }
}

async function db_getAllMessages(){
    try{
        return await Message.find({visible: true})
        .populate({
            path: 'createdBy',
            select: 'firstName lastName username profileUrl',
        })
        .sort({createdAt: 'asc'});
    } catch(err){
        throw err;
    }
}

async function db_deleteMessage(id){
    try {
        return Message.findOneAndUpdate({_id: id}, {visible: false});
    } catch(err){
        throw err;
    }
}

async function db_getMessageById(id){
    try {
        return await Message.findOne({_id:id}).populate({
            path: 'createdBy',
        })
    } catch(err) {
        throw err
    }
}

module.exports = {
    db_addNewMessage,
    db_getAllMessages,
    db_deleteMessage,
    db_getMessageById
}