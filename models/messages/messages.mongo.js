const mongoose  = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;