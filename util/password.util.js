const bcrypt = require('bcrypt')

const ROUNDS = 15;

async function encrypt(userInput){
   return await bcrypt.hash(userInput, ROUNDS);
}

async function validatePassword(userInput, db_value){
    return await bcrypt.compare(userInput, db_value);
}


module.exports = {
    encrypt,
    validatePassword,
}