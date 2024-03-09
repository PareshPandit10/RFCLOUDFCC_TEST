const SocketService = require('../../services/service.socket');
let socket = new SocketService();

function msgPumpStatus(roautoid, msg) {

  msg.getPumpstatusList().forEach(pumpStatusMsg => {
    const pumpStatus = {
      autoId: pumpStatusMsg.getAutoid(),
      status: pumpStatusMsg.getStatus(),
      nozzleAutoId: pumpStatusMsg.getNozzleautoid(),
      trxnVolume: pumpStatusMsg.getTrxnvolume(),
      trxnAmount: pumpStatusMsg.getTrxnamount()
    }
    console.log(pumpStatus);
    socket.emitMessage('PumpStatus', pumpStatus);
  });
  
}

module.exports = { msgPumpStatus }