// socket.js
const socketIO = require('socket.io');

class SocketConnection {

    constructor() {
        if (SocketConnection.instance) {
          return SocketConnection.instance;
        }

        this.io = null;
    
        SocketConnection.instance = this;
      }

    connect(server) {
        try {
            this.io = socketIO(server, {
                cors: {
                    origin: "*"
                }
            });
            console.log(' SOCKET CONNECTION ESTABLISHED SUCCESSFULLY...');
        } catch (error) {
            console.log(' ERROR WHILE SOCKET CONNECTION !!! ', error);
        }

        this.io.on('connection', (socket) => {
            console.log(' USER CONNECTED : ');

            socket.on('disconnect', () => {
                console.log(' USER DISCONNECTED : ');
            });
        });
    }

    getIo(){
        return this.io;
    }
}

module.exports = SocketConnection;
