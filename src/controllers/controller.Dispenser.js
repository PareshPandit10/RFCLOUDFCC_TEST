const { client } = require('../config/config.database')
const getRoautoid = require('./controller.common');

//ADD NEW DISPENSER
const addDispenser = (request, response) => {
  const rocode = request.query.rocode;
  const dispenser = request.body;
  console.log(' NEW DISPENSER : ', dispenser);

  const query = {
    text: `INSERT INTO dispenserdetails(
                                    roautoid,
                                    dispenserid,
                                    makeautoid,
                                    serialno,
                                    rfslaveautoid,
                                    updateby
                                    )
                          VALUES($1,$2,$3,$4,$5,$6)`,
    values: Object.values(dispenser),
  };

  try {
    client.query(query)
      .then(() => {
        console.log(' DISPENSER ADDED SUCCESSFULLY FOR RO ROCODE : ' + rocode + ' DISPENSER ID : ' + dispenser.dispenserid)
        response.status(200).json({ message: 'Dispenser Added Successfully' });
      })
      .catch((error) => {
        console.log(' ERROR WHILE ADDING NEW DISPENSER FOR RO CODE : ' + rocode + ' ' + error.message);
        response.status(200).send(' Something Went Wrong while adding Dispenser ');
      });
  } catch (error) {
    console.log('Database Error ' + error);
    response.status(200).send('Database error');
  }
}
//END ADD NEW DISPENSER

// GET DISPENSER LIST
const getDispenserList = async (request, response) => {
  const rocode = request.query.rocode;
  const roautoid = await getRoautoid(rocode)

  const query = {
    text: `SELECT
                dispenserdetails.id,
                roautoid,
                dispenserid, 
                makeautoid, 
                make,
                serialno,
                rfslaveautoid,
                dispenserdetails.updatetime 
            FROM
                dispenserdetails 
            JOIN
                masterdispensermake ON dispenserdetails.makeautoid =  masterdispensermake.id
            WHERE
                roautoid= $1
            AND 
            dispenserdetails.isenable = 1;`,
    values: [roautoid]
  }

  try {
    client.query(query)
      .then((result) => {
        if (result.rows.length > 0) {
          response.status(200).send(result.rows)
        }
        else {
          console.log(' DISPENSER LIST NOT FOUND FOR RO AUTO ID : ' + roautoid);
          response.status(200).send(' Dispenser List Not Found ');
        }
      })
      .catch((error) => {
        console.log(' ERROR WHILE GETTING DISPENSER LIST ' + error.message);
        response.status(200).send(' Something Went Wrong while getting Dispenser List ');
      })
  } catch (error) {
    console.log(' Database Error In Get Dispenser List' + error);
    response.status(200).send(' Database error ');
  }
}
// END GET DISPENSER LIST

// GET MASTER DU MAKE LIST
const getMasterDUMakeList = (request, response) => {

  const query = {
    text: `SELECT 
                  id,
                  make,
                  model,
                  version
              FROM 
                  masterdispensermake
              WHERE
                  isenable = 1;`
  }

  try {
    client.query(query)
      .then((result) => {
        if (result.rows.length > 0) {
          response.status(200).send(result.rows)
        } else {
          console.log(' MASTER DU MAKE LIST NOT FOUND ');
          response.status(200).send(' Master DU Make List Not Found ');
        }
      })
      .catch((error) => {
        console.log(' ERROR WHILE GETTING MASTER DU MAKE LIST ' + error.message);
        response.status(200).send(' Something Went Wrong while getting Master DU make List ')
      })
  } catch (error) {
    console.log(' Database Error In Master DU Make List' + error);
    response.status(200).send(' Database error ');
  }
}
// END GET MASTER DU MAKE LIST

module.exports = { addDispenser, getDispenserList, getMasterDUMakeList }