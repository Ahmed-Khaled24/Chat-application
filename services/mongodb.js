const mongoose = require('mongoose');

async function connectMongo() {
    try{
        return mongoose.connect(process.env.MONGO_URL)
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