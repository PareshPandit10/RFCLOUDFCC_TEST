const { client } = require('../config/config.database')
const getRoautoid = require('./controller.common');

// ADD NEW PUMP
const addPump = (request, response) => {
    const rocode = request.query.rocode;
    const pump = request.body;
    console.log(' NEW PUMP : ', pump);

    const query = {
        text: `INSERT INTO pumpdetails(
                                roautoid, 
                                pumpid, 
                                dispenserautoid, 
                                type, 
                                mode, 
                                commaddress, 
                                amountdecimalpoint, 
                                volumedecimalpoint, 
                                pricedecimalpoint, 
                                meterdecimalpoint, 
                                presetflag, 
                                presetvalue,
                                npndflag, 
                                npndvalue, 
                                blockflag, 
                                updateby
                            )
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,$16)`,
        values: Object.values(pump)
    };

    try {
        client.query(query)
            .then(() => {
                console.log(' PUMP ADDED SUCCESSFULLY FOR RO CODE : ' + rocode + ' PUMP ID : ' + pump.pumpid)
                response.status(200).json({message :' Pump Added Successfully '});
            })
            .catch((error) => {
                console.log(' ERROR WHILE ADDING NEW PUMP FOR RO CODE : ' + rocode + ' ' + error.message);
                response.status(200).send(' Something Went Wrong while adding Pump ');
            });
    } catch (error) {
        console.log('Database Error ' + error);
        response.status(200).send(' Database error ');
    }
}
// END ADD NEW PUMP

// GET PUMP LIST
const getPumpList = async(request, response) => {
    const rocode = request.query.rocode; 
    const roautoid = await getRoautoid(rocode)
    
    const query = {
        text: `SELECT
                    id,
                    roautoid,
                    pumpid,
                    dispenserautoid ,
                    mode,
                    type,
                    commaddress,
                    amountdecimalpoint,
                    pricedecimalpoint,
                    meterdecimalpoint,
                    volumedecimalpoint,
                    presetflag,
                    presetvalue,
                    npndflag,
                    npndvalue,
                    blockflag,
                    updatetime
                FROM
                    pumpdetails
                WHERE
                    roautoid = $1
                AND
                    isenable = 1
                ORDER BY
                    pumpid;`,
        values: [roautoid]
    }

    try {
        client.query(query)
        .then((result) => {
            if (result.rows.length > 0) {
                response.status(200).send(result.rows)
            }
            else {
                console.log(' PUMP LIST NOT FOUND FOR RO AUTO ID : ' + roautoid);
                response.status(200).send(' Pump List Not Found ');
            }
        })
        .catch((error) => {
            console.log(' ERROR WHILE GETTING PUMP LIST FOR RO AUTO ID : ' + roautoid + ' ' + error.message);
            response.status(200).send(' Something Went Wrong while getting Pump List ');
        })
    } catch (error) {
        console.log(' Database Error In Get Pump List ' + error);
        response.status(200).send(' Database error ');
    }
}
// END GET PUMP LIST

// GET PUMP LIST
const getPumpListByRocode = async(request, response) => {
    const rocode = request.query.rocode;
    const roautoid = await getRoautoid(rocode)
    
    const query = {
        text: `SELECT
                    pumpdetails.id,
                    pumpdetails.pumpid,
                    dispenserdetails.dispenserid,
                    masterdispensermake.make
                FROM
                    pumpdetails
                JOIN
                    dispenserdetails ON pumpdetails.dispenserautoid = dispenserdetails.id
                JOIN
                    masterdispensermake ON dispenserdetails.makeautoid = masterdispensermake.id
                WHERE
                    pumpdetails.roautoid = $1
                AND
                    pumpdetails.isenable = 1;`,
        values: [roautoid]
    }

    try {
        client.query(query)
        .then((result) => {
            if (result.rows.length > 0) {
                response.status(200).send(result.rows)
            }
            else {
                console.log(' PUMP LIST NOT FOUND FOR RO AUTO ID : ' + roautoid);
                response.status(200).send(' Pump List Not Found ');
            }
        })
        .catch((error) => {
            console.log(' ERROR WHILE GETTING PUMP LIST FOR RO AUTO ID : ' + roautoid + ' ' + error.message);
            response.status(200).send(' Something Went Wrong while getting Pump List ');
        })
    } catch (error) {
        console.log(' Database Error In Get Pump List ' + error);
        response.status(200).send(' Database error ');
    }
}
// END GET PUMP LIST
module.exports = { addPump, getPumpList, getPumpListByRocode}