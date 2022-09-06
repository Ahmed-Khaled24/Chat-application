const mongoose = require('mongoose');

async function connectMongo() {
    try{
        return mongoose.connect(process.env.MONGO_URL)
    } catch(err){
        console.log(err.message);
    }
}

mongoose.once('connected', ()=>{
    console.log('MongoDB connected and ready...');
});

mongoose.on('disconnected', ()=>{
    console.log('MongoDB disconnected...')
});

mongoose.on('error', (err)=>{
    console.log(`MongoDB error: ${err.message}`);
});

module.exports = connectMongo();