const { client } = require("../config/config.database");
const getRoautoid = require('./controller.common');

// ADD NEW NOZZLE
const addNozzle = (request, response) => {
  const rocode = request.query.rocode;
  const nozzle = request.body;
  console.log(' NEW NOZZLE : ', nozzle);

  const query = {
    text: `INSERT INTO nozzledetails(
                                  roautoid,
                                  pumpautoid,
                                  nozzleid,
                                  tankautoid,
                                  testingflag,
                                  valueinltr,
                                  testingtime,
                                  blockflag,
                                  totalizer,
                                  updateby
                                  )
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
    values: Object.values(nozzle),
  };
  try {
    client.query(query)
      .then(() => {
        console.log('NOZZLE ADDED SUCCESSFULLY FOR RO CODE :' + rocode + ' NOZZLE ID : ' + nozzle.nozzleid)
        response.status(200).json({ message: ' Nozzle Added Successfully ' });
      })
      .catch((error) => {
        console.log(' ERROR WHILE ADDING NEW NOZZLE FOR RO CODE : ' + rocode + ' ' + error.message);
        response.status(200).send(' Something Went Wrong while adding Nozzle ');
      });
  } catch (error) {
    console.log(' Database Error In Add Nozzle ' + error);
    response.status(200).send(' Database error ');
  }
}
// END ADD NEW NOZZLE

// GET NOZZLE LIST
const getNozzleList = (request, response) => {
  const rocode = request.query.rocode;

  const query = {
    text: `SELECT
                id,
                roautoid,
                pumpautoid,
                nozzleid,
                tankautoid,
                testingflag,
                valueinltr,
                testingtime,
                blockflag,
                totalizer,
                updatetime,
                updateby
            FROM
                nozzledetails
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
          console.log(' NOZZLE LIST NOT FOUND FOR RO CODE: ' + rocode);
          response.status(200).send(' Nozzle List Not Found ');
        }
      })
      .catch((error) => {
        console.log(' ERROR WHILE GETTING NOZZLE LIST FOR RO CODE : ' + rocode + ' ' + error.message);
        response.status(200).send(' Something Went Wrong while getting nozzle List ');
      })
  } catch (error) {
    console.log(' Database Error In Get Nozzle List' + error);
    response.status(200).send(' Database error ');
  }
}
// END GET NOZZLE LIST

const getNozzleListByRocode = (request, response) => {
  const rocode = request.query.rocode;
  const roautoid = getRoautoid(rocode)

  const query = {
    text: `SELECT 
                nozzledetails.id
                nozzleid,
                dispenserdetails.dispenserid, 
                pumpdetails.pumpid, 
                tankid,
                code,
                price,
                color, 
                testingflag,
                valueinltr,
                testingtime,
                blockflag,
                totalizer
            FROM 
                nozzledetails
            JOIN 
                tankdetails on nozzledetails.tankautoid = tankdetails.tankid 
            JOIN 
                productdetails on tankdetails.productautoid = productdetails.id
            JOIN 
                masterproduct on productdetails.id = masterproduct.id
            JOIN 
                pumpdetails on nozzledetails.pumpautoid = pumpdetails.id
            JOIN 
                dispenserdetails on pumpdetails.dispenserautoid = dispenserdetails.id
            WHERE 
                nozzledetails.roautoid = $1 AND nozzledetails.isenable=1;`,
    values: [roautoid]
  }

  try {
    client.query(query)
      .then((result) => {
        if (result.rows.length > 0) {
          response.status(200).send(result.rows)
        }
        else {
          console.log(' NOZZLE LIST NOT FOUND FOR RO CODE : ' + rocode);
          response.status(200).send(' Nozzle List Not Found ');
        }
      })
      .catch((error) => {
        console.log(' ERROR WHILE GETTING NOZZLE LIST FOR RO CODE ID : ' + rocode + ' ' + error.message);
        response.status(200).send(' Something Went Wrong while getting nozzle List ');
      })
  } catch (error) {
    console.log(' Database Error In Get Nozzle List' + error);
    response.status(200).send(' Database error ');
  }
}

const getNozzleData = async (request, response) => {
  rocode = request.query.rocode;
  const roautoid = await getRoautoid(rocode)

  const query = {
    text: `SELECT 
                dispenserdetails.dispenserid,
                masterdispensermake.make ,
                pumpdetails.pumpid, 
                nozzleid, 
                totalizer, 
                code
          FROM 
                nozzledetails
          JOIN
                tankdetails ON nozzledetails.tankautoid = tankdetails.id 
          JOIN 
                productdetails ON tankdetails.productautoid = productdetails.id
          JOIN 
                masterproduct ON productdetails.id = masterproduct.id
          JOIN
                pumpdetails ON nozzledetails.pumpautoid = pumpdetails.id
          JOIN 
                dispenserdetails ON pumpdetails.dispenserautoid = dispenserdetails.id
          JOIN
                masterdispensermake ON dispenserdetails.makeautoid = masterdispensermake.id
          WHERE 
                nozzledetails.roautoid = $1 and nozzledetails.isenable=1;`,
    values: [roautoid]
  }

  try {
    client.query(query)
      .then((result) => {
        if (result.rows.length > 0) {
          response.status(200).send(result.rows)
        }
        else {
          console.log(' NOZZLE LIST NOT FOUND FOR RO CODE : ' + rocode);
          response.status(200).send(' Nozzle List Not Found ');
        }
      })
      .catch((error) => {
        console.log(' ERROR WHILE GETTING NOZZLE LIST FOR RO CODE ID : ' + rocode + ' ' + error.message);
        response.status(200).send(' Something Went Wrong while getting nozzle List ');
      })
  } catch (error) {
    console.log(' Database Error In Get Nozzle List' + error);
    response.status(200).send(' Database error ');
  }
}

const getNozzleListByPumpid = (request, responce) => {
  roautoid = request.query.roautoid
  pumpautoid = request.query.pumpautoid

  client.query(`SELECT
                      nozzledetails.id,
                      nozzleid,
                      totalizer, 
                      code,
                      price,
                      color
                FROM 
                    nozzledetails 
                JOIN 
                    tankdetails ON nozzledetails.tankautoid = tankdetails.id 
                JOIN 
                    productdetails on tankdetails.productautoid = productdetails.id
                JOIN 
                    masterproduct on productdetails.masterproductid = masterproduct.id
                WHERE 
                    nozzledetails.roautoid = $1 AND pumpautoid = $2 and nozzledetails.isenable=1
                GROUP BY
                    nozzledetails.id,
                    nozzleid,
                    totalizer, 
                    code,
                    price,
                    color;`,
    [roautoid, pumpautoid], (err, result) => {
      if (err) {
        console.log(err);
        responce.status(200).send({ "message": "Error in getting Nozzle List" })
        return
      }
      else {
        responce.status(200).send(JSON.stringify(result.rows))
      }
    })
}

module.exports = { addNozzle, getNozzleList, getNozzleListByRocode, getNozzleData, getNozzleListByPumpid }