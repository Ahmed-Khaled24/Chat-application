const { VerifaliaRestClient } = require('verifalia');

const verifalia = new VerifaliaRestClient({
    username: process.env.VERIFALIA_USERNAME,
    password: process.env.VERIFALIA_PASSWORD,
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