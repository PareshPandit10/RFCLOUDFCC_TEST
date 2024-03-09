const { client } = require('../../config/config.database');
const SocketService = require('../../services/service.socket');
let socket = new SocketService();

function msgNozzleTotalizer(roautoid, msg) {

    msg.getNozzletotalizerList().forEach((nozzleTotalizerMsg) => {
        const nozzleTotalizer = {
            totalizertype: nozzleTotalizerMsg.getTotalizertype(),
            shiftautoid: nozzleTotalizerMsg.getShiftautoid(),
            dayautoid: nozzleTotalizerMsg.getDayautoid(),
            nozzleautoid: nozzleTotalizerMsg.getNozzleautoid(),
            volumetotalizer: nozzleTotalizerMsg.getVolumetotalizer(),
            totalvolumesale: nozzleTotalizerMsg.getTotalvolumesale(),
            totalamountsale: nozzleTotalizerMsg.getTotalamountsale()
        }

        console.log(nozzleTotalizer);

        //Day Open Nozzle Totalizer
        if (nozzleTotalizer.totalizertype == 0) {
            const query = {
                text: `INSERT INTO dayendtotalizer(
                                            roautoid, 
                                            dayautoid, 
                                            nozzleautoid, 
                                            starttotalizer
                                            )
                        VALUES ($1, $2, $3, $4)`,
                values: [roautoid, nozzleTotalizer.dayautoid, nozzleTotalizer.nozzleautoid, nozzleTotalizer.volumetotalizer],
            };

            client.query(query)
                .then(() => {
                    console.log("Nozzle Totalizer For Day open Inserted Successfully");
                })
                .catch((error) => {
                    console.error("Error occurred while Inserting Day open Nozzle Totalizer:", error);
                });
        }

        //Day Close Nozzle Totalizer
        if (nozzleTotalizer.totalizertype == 1) {
            let query = {
                text: `UPDATE dayendtotalizer 
                         SET
                            endtotalizer = $1,
                            totalsale = $2,
                            totalvolume = $3    
                         WHERE
                            dayautoid = $4 AND roautoid = $5`,
                values: [
                    nozzleTotalizer.volumetotalizer,
                    nozzleTotalizer.totalamountsale,
                    nozzleTotalizer.totalvolumesale,
                    nozzleTotalizer.dayautoid,
                    roautoid
                ]
            };

            client.query(query)
                .then(() => {
                    console.log("Nozzle Totalizer For Day Close Updated Successfully");
                })
                .catch((error) => {
                    console.error("Error occurred while updating Day Close Nozzle Totalizer:", error);
                });
        }

        //Shift Open Nozzle Totalizer
        if (nozzleTotalizer.totalizertype == 2) {
            let query = {
                text: `INSERT INTO shiftendtotalizer
                                          (
                                            roautoid,
                                            shiftautoid,
                                            nozzleautoid,
                                            starttotalizer
                                          ) 
                        values ($1,$2,$3,$4)`,
                values: [
                    roid,
                    nozzleTotalizer.shiftautoid,
                    nozzleTotalizer.nozzleautoid,
                    nozzleTotalizer.volumetotalizer,
                ]
            }
            client.query(query)
                .then(() => {
                    console.log("Nozzle Totalizer For Shift open Inserted Successfully");
                })
                .catch((error) => {
                    console.error("Error occurred while Inserting shift open Nozzle Totalizer:", error);
                });
        }

        //Shift Close Nozzle Totalizer
        if (nozzleTotalizer.totalizertype == 3) {
            let query = {
                text: `UPDATE 
                             shiftendtotalizer 
                        SET
                            endtotalizer = $1,
                            totalsale = $2,
                            totalvolume = $3    
                        WHERE
                            roautoid = $4;`,
                values: [
                    nozzleTotalizer.volumetotalizer,
                    nozzleTotalizer.totalamountsale,
                    nozzleTotalizer.totalvolumesale,
                    roautoid
                ]
            }
            client.query(query)
                .then(() => {
                    console.log("Nozzle Totalizer For Shift Close Updated Successfully");
                })
                .catch((error) => {
                    console.error("Error occurred while updating shift Close Nozzle Totalizer:", error);
                });
        }
    })
}

module.exports = { msgNozzleTotalizer }