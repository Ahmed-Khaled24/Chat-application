const mongoose = require('mongoose');
const keys = require('../config/keys');

async function connectMongo() {
    try{
        return mongoose.connect(keys.mongo_url)
    } catch(err){
        console.log(err.message);
    }
}

mongoose.connection.once('connected', ()=>{
    console.log('MongoDB connected and ready...');
});

mongoose.connection.on('disconnected', ()=>{
    console.log('MongoDB disconnected...')
});

mongoose.connection.on('error', (err)=>{
    console.log(`MongoDB error: ${err.message}`);
});

module.exports = connectMongo;