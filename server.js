require('dotenv').config();
require('./services/passport');
const http = require('http');
const app = require('./api');
const {Server} = require('socket.io');
const configSockets = require('./socket');
const connectMongo = require('./services/mongodb');

const httpServer = http.createServer(app);
const socketServer = new Server(httpServer);

async function startServer() {
    await connectMongo();
    configSockets(socketServer);
    httpServer.listen(process.env.PORT, ()=>{
        console.log(`Server is listening on port ${process.env.PORT}...`);
    })
}
startServer();