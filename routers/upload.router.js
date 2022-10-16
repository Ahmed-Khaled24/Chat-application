const {Router} = require('express')
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner');
const {PutObjectCommand} = require('@aws-sdk/client-s3')
const s3client = require('../services/aws');
const uuid = require('uuid');
const keys = require('../config/keys');
const uploadRouter = Router();
const checkLoggedIn = require('../middlewares/checkLoggedIn')

uploadRouter.get('/requestUploadSignedUrl', checkLoggedIn, 
    async (req, res) => {
        const key = `${req.user.id}/${uuid.v1()}`;
        const command = new PutObjectCommand({
            Key: key,
            Bucket: keys.bucket_name
        });
        try {
            const signedUrl = await getSignedUrl(s3client, command);
            res.status(200).json({
                key,
                signedUrl,
                status: 'success',
            })
        } catch(err) {
            console.log(err.message);
        }
    }
);

module.exports = uploadRouter;