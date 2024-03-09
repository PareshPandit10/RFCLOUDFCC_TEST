const { client } = require('../config/config.database');
const getRoautoid = require('./controller.common');

// ADD NEW TANK
const addTank = (request, response) => {
    const rocode = request.query.rocode;
    const tank = request.body;
    console.log('NEW TANK : ', tank);

    const query = {
        text: `INSERT INTO tankdetails(
                                    roautoid,
                                    tankid,
                                    productautoid,
                                    probeautoid,
                                    height,
                                    capacity,
                                    productlowflag,
                                    productlowvalue,
                                    waterhighflag,
                                    waterhighvalue,
                                    ttreceiptflag,
                                    ttreceiptvalue,
                                    commfailflag,
                                    commfailvalue,
                                    deliveryflag,
                                    blockflag,
                                    updateby
                                    )
                VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
        values: Object.values(tank)
    };

    try {
        client.query(query)
            .then(() => {
                console.log(' TANK ADDED SUCCESSFULLY FOR RO CODE : ' + rocode + ' Tank ID : ' + tank.tankid)
                response.status(200).json({message : ' Tank Added Successfully '});
            })
            .catch((error) => {
                console.log(' ERROR WHILE ADDING NEW TANK FOR RO AUTO ID : ' + tank.roautoid + ' ' + error.message);
                response.status(200).json({ message: ' Something Went Wrong while adding Tank '});
            });
    } catch (error) {
        console.log(' Database Error In Add Tank' + error);
        response.status(200).send(' Database error ');
    }
}
// END ADD NEW TANK

// GET TANK LIST
const getTankList = async (request, response) => {
    const rocode = request.query.rocode;
    const roautoid = await getRoautoid(rocode)

    const query = {
        text: `SELECT
                    id,
                    roautoid,
                    tankid,
                    productautoid,
                    probeautoid,
                    height,
                    capacity,
                    productlowflag,
                    productlowvalue,
                    waterhighflag,
                    waterhighvalue,
                    ttreceiptflag,
                    ttreceiptvalue,
                    commfailflag,
                    commfailvalue,
                    deliveryflag,
                    blockflag,
                    updateflag
                FROM
                    tankdetails
                WHERE
                    roautoid = $1 
                AND 
                    isenable = 1;`,
        values: [roautoid]
    }

    try {
        client.query(query)
            .then((result) => {
                if (result.rows.length > 0) {
                    response.status(200).send(result.rows)
                }
                else {
                    console.log(' TANK LIST NOT FOUND FOR RO CODE : ' + rocode);
                    response.status(200).send(' Tank List Not Found ');
                }
            })
            .catch((error) => {
                console.log(' ERROR WHILE GETTING TANK DETAILS FOR RO CODE : ' + rocode + ' ' + error.message);
                response.status(200).send(' Something Went Wrong while getting tank ');
            })
    } catch (error) {
        console.log(' Database Error In get Tank List ' + error);
        response.status(200).send(' Database error ');
    }
}
// END GET TANK LIST

// GET TANK LIST BY ROCODE
const getTankListByRocode =async (request, response) => {
    const rocode = request.query.rocode;
    const roautoid = await getRoautoid(rocode)

    const query = {
        text: `SELECT
                    tankdetails.id,
                    tankid,
                    productautoid,
                    capacity,
                    code,
                    color
                FROM
                    tankdetails
                JOIN
                    productdetails ON tankdetails.productautoid = productdetails.id
                JOIN
                    masterproduct ON productdetails.masterproductid = masterproduct.id
                WHERE
                    tankdetails.roautoid = $1 
                AND 
                    tankdetails.isenable = 1;`,
        values: [roautoid]
    }

    try {
        client.query(query)
            .then((result) => {
                if (result.rows.length > 0) {
                    response.status(200).send(result.rows)
                }
                else {
                    console.log(' TANK LIST NOT FOUND FOR RO AUTO ID : ' + roautoid);
                    response.status(200).send(' Tank List Not Found ');
                }
            })
            .catch((error) => {
                console.log(' ERROR WHILE GETTING TANK DETAILS FOR RO AUTO ID : ' + roautoid + ' ' + error.message);
                response.status(200).send(' Something Went Wrong while getting tank ');
            })
    } catch (error) {
        console.log(' Database Error In Tank List By Rocode ' + error);
        response.status(200).send(' Database error ');
    }
}
// END GET TANK LIST BY ROCODE

module.exports = { addTank, getTankListByRocode, getTankList }