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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    visible: {
        type: Boolean,
        default: true,
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;