require('dotenv').config();
require('./services/passport');
const http = require('http');
const app = require('./api');
const {Server} = require('socket.io');
const configSockets = require('./socket');
const connectMongo = require('./services/mongodb');
const keys = require('./config/keys');

const httpServer = http.createServer(app);
const socketServer = new Server(httpServer);

async function startServer() {
    await connectMongo();
    configSockets(socketServer);
    httpServer.listen(keys.port, () => {
        console.log(`Server is listening on port ${keys.port}`);
    })
}
startServer();