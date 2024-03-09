const { client } = require('../config/config.database');

async function getRoautoid(rocode) {
    let query = {
        text: `SELECT 
                    id 
                FROM 
                    rodetails 
                WHERE 
                rocode = $1`,
        values: [rocode]
    };

    try {
        const result = await client.query(query);
        if (result.rows.length > 0) {
            return result.rows[0].id;
        } else {
            console.log('NO RO ID FOUND FOR ROCODE ' + rocode);
            return null; 
        }
    } catch (error) {
        console.log('DATABASE ERROR IN GET RO AUTO ID ' + error);
        throw error;
    }
}

async function getRoDetails(rocode) {
    let query = {
        text: `SELECT 
                    id,
                    rocode,
                    roname,
                    rotype,
                    address,
                    pincode,
                    city,
                    state,
                    country,
                    region,
                    commissioningdate,
                    initializedate,
                    resitementdate,
                    sivendor,
                    atgvendor
                FROM 
                    rodetails 
                WHERE 
                    rocode = $1`,
        values: [rocode]
    };

    try {
        const result = await client.query(query);
        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            console.log('NO RO DETAILS FOUND FOR ROCODE ' + rocode);
            return null; // or throw an error if appropriate
        }
    } catch (error) {
        console.log('DATABASE ERROR IN GET RO DETAILS ' + error);
        throw error; // throw error for caller to handle
    }
}

module.exports =  getRoautoid, getRoDetails;
