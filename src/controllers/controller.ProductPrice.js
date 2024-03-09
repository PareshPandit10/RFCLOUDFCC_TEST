const { client } = require('../config/config.database')
const getRoautoid = require('./controller.common');

const addPriceChange = (request, response) => {
    const rocode = request.query.rocode;
    const priceChangeData = request.body;

    console.log(' NEW PRICE CHANGE DATA ', priceChangeData);

    const query = {
        text: `INSERT INTO pricechange(
                                        roautoid, 
                                        changetype, 
                                        productautoid, 
                                        price, 
                                        effectivefrom, 
                                        effectiveto,  
                                        updateby, 
                                        status
                                        )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        values: Object.values(priceChangeData)
    }

    try {
        client.query(query)
            .then(() => {
                console.log(rocode+ ' PRICE CHANGE ADDED SUCCESSFULLY ');
                response.status(200).json({ message: ' Price change Added Successfully ' });
            })
            .catch((error) => {
                console.log(' ERROR WHILE ADDING PRICE CHANGE  ' + error);
                response.status(200).send(' Something Went Wrong while Price Change Data ');
            });
    } catch (error) {
        console.log(' Database Error While Adding Price Change Outlet ' + error);
        response.status(200).send(' Database error while adding price Change data ');
    }
}

const getPriceChangeList = async (request, response) => {
    const rocode = request.query.rocode;
    const roautoid = await getRoautoid(rocode)

    const query = {
        text: `SELECT 
                    id,
                    changetype,
                    productautoid,
                    price,
                    effectivefrom,
                    effectiveto,
                    status,
                    updateflag
                FROM
                    pricechange
                WHERE
                    roautoid = $1`,
        values: [roautoid]
    }

    client.query(query)
        .then((result) => {
            if (result.rows.length == 0) {
                console.log('No Price Change Record Found For ROCODE ' + rocode);
                response.status(200).json({message:' No Price Change Found For this ROCODE '})
            }
            else {
                console.log('Price Change Reocord Pulled By ROCODE ' + rocode);
                response.status(200).json(result.rows)
            }
        })
        .catch((error) => {
            response.status(200).json({ message: 'Error While Getting Price Change Data' })
            console.log(error.message);
        })
}

const getPriceChangeListByRocode = async (request, response) => {
    const rocode = request.query.rocode;
    const roautoid = await getRoautoid(rocode)

    const query = {
        text: `SELECT 
                    id,
                    changetype,
                    productautoid,
                    price,
                    effectivefrom,
                    effectiveto,
                    status,
                    updateflag
                FROM
                    pricechange
                WHERE
                    roautoid = $1`,
        values: [roautoid]
    }

    client.query(query)
        .then((result) => {
            if (result.rows.length == 0) {
                console.log('No Price Change Record Found For ROCODE ' + rocode);
                response.status(200).json({message:' No Price Change Found For this ROCODE '})
            }
            else {
                console.log('Price Change Reocord Pulled By ROCODE ' + rocode);
                response.status(200).json(result.rows)
            }
        })
        .catch((error) => {
            response.status(200).json({ message: 'Error While Getting Price Change Data' })
            console.log(error.message);
        })
}

const updatePriceChangeList = (request, response) => {
    const data = request.body;

    // Convert the size to megabytes
    const dataSizeInBytes = JSON.stringify(data).length;
    const dataSizeInMB = dataSizeInBytes / (1024 * 1024); // 1 MB = 1024 * 1024 bytes

    // Log the data, its size in bytes, and its size in megabytes
    console.log('Received data:', data);
    console.log('Data size in bytes:', dataSizeInBytes);
    console.log('Data size in MB:', dataSizeInMB.toFixed(2) + ' MB');

    response.status(200).send('Record Received');
};

module.exports = { getPriceChangeList, updatePriceChangeList, addPriceChange, getPriceChangeListByRocode }