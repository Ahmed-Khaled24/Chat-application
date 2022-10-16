module.exports = {
    mongo_url: process.env.MONGO_URL,
    session_secret: process.env.SESSION_SECRET,
    verifalia_username: process.env.VERIFALIA_USERNAME,
    verifalia_password: process.env.VERIFALIA_PASSWORD,
    port: process.env.PORT,
    google_client_id: process.env.GOOGLE_CLIENT_ID_PROD,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET_PROD,
    access_key_id: process.env.ACCESS_KEY_ID,
    secret_access_key: process.env.SECRET_ACCESS_KEY,
    google_callback: 'https://chat-applicatin-kh.herokuapp.com/auth/google/callback',
    bucket_name: 'chat-application-bucket01',
}