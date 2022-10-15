module.exports = {
    mongo_url: 'mongodb://localhost:27017/chat',
    session_secret: '123456789',
    verifalia_username: process.env.VERIFALIA_USERNAME,
    verifalia_password: process.env.VERIFALIA_PASSWORD,
    port: process.env.PORT,
    google_client_id: process.env.GOOGLE_CLIENT_ID_DEV,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET_DEV,
    access_key_id: process.env.ACCESS_KEY_ID,
    secret_access_key: process.env.SECRET_ACCESS_KEY,
    google_callback: '/auth/google/callback',
}