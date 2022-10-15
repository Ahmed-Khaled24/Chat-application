const { VerifaliaRestClient } = require('verifalia');
const keys = require('../config/keys')

const verifalia = new VerifaliaRestClient({
    username: keys.verifalia_username,
    password: keys.verifalia_password,
});

async function validateEmail(email){
    try{
        const validation = await verifalia
            .emailValidations
            .submit(email, true);
        return {
            status: validation.entries[0].status.toLowerCase(),
            classification: validation.entries[0].classification.toLowerCase(),
        }      
    } catch(err){
        throw err;
    }
}

module.exports = {
    validateEmail,
}