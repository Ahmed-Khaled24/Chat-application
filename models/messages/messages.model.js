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
        return 
        await Message.find({})
        .populate({
            path: 'createdBy',
            select: 'name profileUrl',
        })
        .sort({createdAt: 'asc'})
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


module.exports = {
    db_addNewMessage,
    db_deleteMessage,
    db_getAllMessages,
}