const { Server } = require('socket.io');
const { setIoInstance } = require('./socketEvents/eventEmitter');
const socketEvents = require('./socketEvents');

let io;

const initSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    setIoInstance(io); 
    socketEvents(io);
};

module.exports = { initSocket };
