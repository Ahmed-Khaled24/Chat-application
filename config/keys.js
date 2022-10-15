const ENV = process.env.Node_ENV.trim();

let keys;
if (ENV === 'production') {
    keys = require('./prod')
} else if (ENV === 'development') {
    keys = require('./dev');
}

console.log(keys);
module.exports = keys;