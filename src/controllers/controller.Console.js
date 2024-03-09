const { client } = require('../config/config.database')
const getRoautoid = require('./controller.common');

//ADD NEW ATG CONSOLE
const addConsole = (request, response) => {
    const rocode = request.query.rocode
    const atgconsole = request.body;

    console.log(' ADD ATG CONSOLE : ', atgconsole);

    const query = {
        text: `INSERT into consoledetails(
                                    roautoid,
                                    masterconsoleid,
                                    type,
                                    serialno, 
                                    comport,
                                    updateby
                                    )
                            VALUES($1,$2,$3,$4,$5,$6)`,
        values: Object.values(atgconsole),
    };

    try {
        client.query(query)
            .then(() => {
                console.log(' ATG CONSOLE ADDED SUCCESSFULLY FOR RO CODE : ' + rocode + ' MASTER ATG CONSOLE ID : ' + atgconsole.masterconsoleid);
                response.status(200).json({message : ' ATG Console Added Successfully '});
            })
            .catch((error) => {
                console.log(' ERROR WHILE ADDING ATG CONSOLE FOR RO CODE : ' + rocode + ' ' + error.message);
                response.status(200).send(' Something Went Wrong While adding ATG Console ');
            });
    } catch (error) {
        console.log(' Database Error In Add ATG Console  ' + error);
        response.status(200).send('Database error');
    }
}
// END ADD NEW ATG CONSOLE

//GET ATG CONSOLE LIST
const getConsoleList = async (request, response) => {
    const rocode = request.query.rocode;
    const roautoid = await getRoautoid(rocode)

    const query = {
        text: `SELECT
                    id,
                    roautoid,
                    masterconsoleid,
                    serialno,
                    comport,
                    type,
                    updateflag
                FROM
                    consoledetails
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
                    console.log(' ATG CONSOLE LIST NOT FOUND FOR RO AUTO ID : ' + roautoid);
                    response.status(200).send(' ATG Console List Not Found ');
                }
            })
            .catch((error) => {
                console.log(' ERROR WHILE GETTING ATG CONSOLE LIST FOR RO AUTO ID : ' + roautoid + ' ' + error.message);
                response.status(200).send(' Something Went Wrong while getting ATG Console List ');
            })
    } catch (error) {
        console.log('Database Error In Get Console List ' + error);
        response.status(200).send(' Database error ')
    }
}
//END GET ATG CONSOLE LIST

// GET MASTER ATG CONSOLE
const getMasterConsole = (request, response) => {

    const query = {
        text: `SELECT 
                    id,
                    make,
                    model,
                    version,
                    updateflag
                FROM
                    masterconsole
                WHERE
                    isenable = 1`
    }

    try {
        client.query(query)
            .then((result) => {
                if (result.rows.length > 0) {
                    response.status(200).send(result.rows)
                }
                else {
                    console.log(' MASTER ATG CONSOLE LIST NOT FOUND ');
                    response.status(200).send(' Master ATG Console List Not Found ')
                }
            }).catch((error) => {
                console.log(' ERROR WHILE GETTING MASTER ATG CONSOLE ' + error.message);
                response.status(200).send(' Something Went Wrong While getting Master ATG Console List ')
            })
    } catch (error) {
        console.log('Database Error Get Master console List ' + error);
        response.status(200).send(' Database error ')
    }
}
// END GET MASTER ATG CONSOLE

module.exports = { addConsole, getConsoleList, getMasterConsole }