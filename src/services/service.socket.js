const socketConnection = require('../connections/connection.socket');

class SocketService {

    constructor() {
        if (SocketService.instance) { 
            return SocketService.instance;
        }
        SocketService.instance = this;
    }

    async startSocketService() {
        this.io = new socketConnection().getIo();
    }

    async emitMessage(eventName, data) {
        this.io.emit(eventName, data);
    }
}

module.exports = SocketService;
