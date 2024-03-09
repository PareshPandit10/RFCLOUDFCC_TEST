const { client } = require('../../config/config.database');
const SocketService = require('../../services/service.socket');
let socket = new SocketService();

function msgDeviceStatus(roautid, msg) {
    msg.getDevicestatusList().forEach((deviceStatusMsg) => { 
        const deviceStatus = {
            deviceId: deviceStatusMsg.getAutoid(),
            status: deviceStatusMsg.getStatus(),
            swVersion: deviceStatusMsg.getSwversion(),
            hwVersion: deviceStatusMsg.getHwversion(),
        }
        console.log(deviceStatus);
        socket.emitMessage("deviceStatus", deviceStatus);
    })
}

module.exports = { msgDeviceStatus }