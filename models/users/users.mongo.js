const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    secondName: String,
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    salt: String,
    createdAt: Date,
    profileUrl: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;