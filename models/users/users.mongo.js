const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true,
        required: true,
        unique: true,
    },
    password: String,
    createdAt: Date,
    profileUrl: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;