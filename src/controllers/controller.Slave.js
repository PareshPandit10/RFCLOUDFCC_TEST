const { client } = require('../config/config.database')
const getRoautoid = require('./controller.common');

// ADD NEW RFSLAVE
const addRFSlave = (request, response) => {
    const rocode = request.query.rocode
    const slave = request.body;
    console.log('NEW RFSLAVE:', slave);

    const query = {
        text: `INSERT into rfslavedetails(
                                    roautoid,
                                    rfslaveid,
                                    type,
                                    trxnlimit,
                                    commaddress,
                                    firmwareversion,
                                    serialno,
                                    updateby
                                    )
                    VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,
        values: Object.values(slave),
    };

    try {
        client.query(query)
            .then(() => {
                console.log(' RFSLAVE ADDED SUCCESSFULLY FOR RO CODE : ' + rocode + ' RFSLAVE ID :' + slave.rfslaveid)
                response.status(200).json({ message: ' RFSlave Added Successfully ' });
            })
            .catch((error) => {
                console.log(' ERROR WHILE ADDING RFSLAVE ' + error.message);
                response.status(200).send(' Something Went Wrong while adding RFSlave ');
            });
    } catch (error) {
        console.log('Database Error ' + error);
        response.status(200).send('Database error');
    }
}
// END ADD NEW RFSLAVE

// GET RFSLAVE LIST
const getRFSlaveList = async (request, response) => {
    const rocode = request.query.rocode;
    const roautoid = await getRoautoid(rocode);

    const query = {
        text: `SELECT
                    id,
                    rfslaveid,
                    type,
                    trxnlimit,
                    firmwareversion,
                    commaddress,
                    serialno,
                    updatetime
                FROM 
                    rfslavedetails 
                WHERE 
                    roautoid =$1
                AND
                    isenable=1;`,
        values: [roautoid]
    }

    try {
        client.query(query)
            .then((result) => {
                if (result.rows.length > 0) {
                    response.status(200).send(result.rows)
                }
                else {
                    console.log(' RFSLAVE LIST NOT FOUND FOR RO AUTO ID : ' + roautoid);
                    response.status(200).send(' RFSlave List Not Found ');
                }
            })
            .catch((error) => {
                console.log(' ERROR WHILE GETTING RFSLAVE DETAILS FOR RO AUTO ID : ' + roautoid + ' ' + error.message);
                response.status(200).send(' Something Went Wrong while getting RFSlave ');
            })
    } catch (error) {
        console.log(' Database Error ' + error);
        response.status(200).send(' Database error ');
    }
}
// END GET RFSLAVE LIST

module.exports = { addRFSlave, getRFSlaveList }