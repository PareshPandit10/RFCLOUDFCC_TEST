const { client } = require('../../config/config.database');

function msgPumpTrxn(roautoid, msg) {

    msg.getPumptrxnList().forEach(pumpTrxn => {
        const pumpTrxnMsg = {
            nozzleautoid: pumpTrxn.getAutoid(),
            starttime: pumpTrxn.getTrxnstarttime(),
            endtime: pumpTrxn.getTrxnendtime(),
            price: pumpTrxn.getUnitrate(),
            amount: pumpTrxn.getTrxnamount(),
            volume: pumpTrxn.getTrxnvolume(),
            starttotalizer: pumpTrxn.getStartvolumetotalizer(),
            endtotalizer: pumpTrxn.getEndvolumetotalizer(),
            mop: pumpTrxn.getMoptype(),
            presettype: pumpTrxn.getPresettype(),
            presetvalue: pumpTrxn.getPresetvalue(),
            presetmode: pumpTrxn.getPresetmode()
        };
        console.log(pumpTrxnMsg);

        let query = {
            text: `INSERT INTO pumptransactions (
                                    roautoid, 
                                    nozzleautoid, 
                                    starttime,
                                    endtime, 
                                    price, 
                                    amount,
                                    volume,
                                    starttotalizer,
                                    endtotalizer,
                                    mop,
                                    presettype,
                                    presetvalue,
                                    presetmode
                                  ) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13)`,
            values: [
                roautoid,
                pumpTrxnMsg.nozzleautoid,
                pumpTrxnMsg.starttime,
                pumpTrxnMsg.endtime,
                pumpTrxnMsg.price,
                pumpTrxnMsg.amount,
                pumpTrxnMsg.volume,
                pumpTrxnMsg.starttotalizer,
                pumpTrxnMsg.endtotalizer,
                pumpTrxnMsg.mop,
                pumpTrxnMsg.presettype,
                pumpTrxnMsg.presetvalue,
                pumpTrxnMsg.presetmode
            ]
        };
    
        let query1 = {
            text: `UPDATE 
                        nozzledetails 
                    SET 
                        totalizer = $1 
                    WHERE
                        id = $2`,
            values: [pumpTrxnMsg.endtotalizer, pumpTrxnMsg.nozzleautoid]
        }
    
        client.query(query)
            .then(() => {
                console.log("Transaction Inserted Successfully");
            })
            .catch((error) => {
                console.error("Error occurred during the transaction inserstion:", error);
            });
    
        client.query(query1)
            .then(() => {
                console.log("Totalizer Updated Successfully");
            })
            .catch((error) => {
                console.error("Error occurred while updating totalizer:", error);
            });
    });  
}

module.exports = { msgPumpTrxn }