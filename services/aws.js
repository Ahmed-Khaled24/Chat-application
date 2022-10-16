const {S3Client} = require('@aws-sdk/client-s3');
const keys = require('../config/keys');

const params = {
    region: 'eu-west-3',
    credentials: {
        accessKeyId: keys.access_key_id,
        secretAccessKey: keys.secret_access_key,
    }
};

const client = new S3Client(params);

module.exports = client;