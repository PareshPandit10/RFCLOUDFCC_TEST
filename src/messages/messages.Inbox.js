const { client } = require('../config/config.database');
const { msgDeviceStatus } = require('./messages.FccToBos/msg.deviceStatus');
const { msgNozzleTotalizer } = require('./messages.FccToBos/msg.nozzleTotalizer');
const { msgPumpStatus } = require('./messages.FccToBos/msg.pumpStatus');
const { msgPumpTrxn } = require('./messages.FccToBos/msg.pumpTrxn');
const { msgTankInventory } = require('./messages.FccToBos/msg.tankInventory');

async function Inbox(msg) {
    let roautoid;
    try {
        // Get RO auto Sequence Id of Rocode
        roautoid = await getRoid(msg.getRocode());
    } catch (error) {
        console.error('Error While Getting Rocode:', error);
    }

    if (roautoid != null) {

        try {
            let msgID = msg.getMsgid();

            switch (msgID) {
                case 1:
                    msgPumpStatus(roautoid, msg)
                    break;

                case 2:
                    msgPumpTrxn(roautoid, msg)
                    break;

                case 3:
                    msgTankInventory(roautoid, msg)
                    break;

                case 4:
                    msgDeviceStatus(roautoid, msg)
                    break;

                case 5:
                    msgNozzleTotalizer(roautoid, msg)
                    break;

                default:
                    console.log('NO MSG ID MATCH', msgID);
                    break;
            }
        }

        catch (error) {
            console.log(' Error While Routing the Messages', error);
        }
    }
}

function getRoid(rocode) {
    return new Promise((resolve, reject) => {
        const query = {
            text: `SELECT id FROM rodetails WHERE rocode = $1;`,
            values: [rocode]
        }

        client.query(query)
            .then((result) => {
                if (result.rows.length > 0) {
                    resolve(result.rows[0].id);
                }
                else {
                    console.log('No RO ID Found for ROCODE ' + rocode);
                    resolve(null)
                }

            })
            .catch((error) => {
                console.error('Error While Getting RO Auto Id For Rocode ' + rocode + ' ' + error);
                reject(error);
            });
    });
}

module.exports = { Inbox };