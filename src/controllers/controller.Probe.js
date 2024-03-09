const { client } = require("../config/config.database");
const getRoautoid = require('./controller.common');

// ADD NEW ATG PROBE
const addProbe = (request, response) => {
    const rocode = request.query.rocode;
    const atgprobe = request.body;

    console.log(' NEW ATG PROBE : ', atgprobe);

    const query = {
        text: `INSERT into probedetails(
                                        roautoid,
                                        masterprobeid,
                                        type,
                                        serialno,
                                        updateby
                                        )
                            VALUES($1,$2,$3,$4,$5)`,
        values: Object.values(atgprobe),
    };

    try {
        client.query(query)
            .then(() => {
                console.log(' ATG PROBE ADDED SUCCESSFULLY FOR RO CODE : ' + rocode + ' MASTER ATG PROBE ID : ' + atgprobe.masterprobeid + ' PROBE TYPE ' + atgprobe.type)
                response.status(200).json({message:' ATG Probe Added Successfully '});
            })
            .catch((error) => {
                console.log(' ERROR WHILE ADDING ATG PROBE FOR RO CODE : ' + rocode + ' ' + error.message);
                response.status(200).send(' Something Went Wrong while adding ATG Probe ');
            });
    } catch (error) {
        console.log('Database Error In Add Probe' + error);
        response.status(200).send('Database error');
    }
}
// END ADD NEW ATG PROBE

// GET PROBE LIST
const getProbeList = async (request, response) => {
    const rocode = request.query.rocode;
    const roautoid = await getRoautoid(rocode)

    const query = {
        text: `SELECT 
                    probedetails.id,
                    type,
                    serialno,
                    make,
                    model, 
                    version
                FROM
                    probedetails
                JOIN
                    masterprobe ON probedetails.masterprobeid = masterprobe.id
                WHERE
                    roautoid = $1
                AND 
                    probedetails.isenable = 1;`,
        values: [roautoid]
    }
    try {
        client.query(query)
            .then((result) => {
                if (result.rows.length > 0) {
                    response.status(200).send(result.rows)
                }
                else {
                    console.log(' ATG PROBE DETAILS NOT FOUND FOR RO AUTO ID : ' + roautoid + ' ' + error.message);
                    response.status(200).send(' ATG Probe Details Not Found ');
                }
            })
            .catch((error) => {
                console.log(' ERROR WHILE GETTING PROBE DETAILS FOR RO AUTO ID : ' + roautoid + ' ' + error.message);
                response.status(200).send(' Something Went Wrong while getting Probe details ');
            })
    } catch (error) {
        console.log(' Database Error In Get Probe List' + error);
        response.status(200).send(' Database error ');
    }
}
// END GET PROBE LIST

// GET MASTER PROBE LIST
const getMasterProbeList = (request, response) => {

    const query = {
        text: `SELECT 
                    id,
                    make,
                    model,
                    version
                FROM 
                    masterprobe
                WHERE
                    isenable = 1`
    }

    try {
        client.query(query).
        then((result) => {
            if (result.rows.length > 0) {
                response.status(200).send(result.rows)
            } else {
                console.log(' MASTER ATG PROBE LIST NOT FOUND ');
                response.status(200).send(' Master ATG Probe List Not Found ');
            }
        }).
        catch((error) => {
            console.log(' ERROR WHILE GETTING MASTER ATG PROBE LIST ' + error.message );
            response.status(200).send(' Something Went Wrong while getting Master ATG Probe List ')
        })
    } catch (error) {
        console.log(' Database Error In Get master Probe List' + error);
        response.status(200).send(' Database error ');
    }
}
// END GET MASTER PROBE LIST

module.exports = { addProbe, getProbeList, getMasterProbeList }