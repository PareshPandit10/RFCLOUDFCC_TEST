const { client } = require('../config/config.database');
const bcrypt = require("bcrypt");

// ADD NEW RETAIL OUTLET
const addRetailOutlet = (request, response) => {
  const rodata = request.body;
  console.log(' NEW RODATA ', rodata);

  const query = {
    text: `INSERT INTO rodetails(
                          rocode,
                          roname,
                          rotype,
                          address,
                          pincode,
                          city,
                          state,
                          country,
                          region,
                          dealername,
                          phonenumber,
                          mobilenumber,
                          email,
                          commissioningdate,
                          initializedate,
                          resitementdate,
                          sivendor,
                          atgvendor,
                          csid,
                          updateby
                        )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,$17,$18,$19,$20)`,
    values: Object.values(rodata)
  };

  try {
    client.query(query)
      .then(() => {
        console.log(rodata.rocode + ' RETAIL OUTLET ADDED SUCCESSFULLY ');
        response.status(200).json({ message: ' Retail Outlet Added Successfully ' });
        createUserCredentials(rodata.rocode, rodata.updateby);
      })
      .catch((error) => {
        if (error.code === '23505') {
          console.log(' RETAIL OUTLET ALREADY EXISTS ' + rodata.rocode);
          response.status(200).send(' Retail Outlet already exists ');
        }
        else {
          console.log(' ERROR WHILE ADDING NEW RETAIL OUTLET  ' + error);
          response.status(200).send(' Something Went Wrong while adding Retail Outlet ');
        }
      });
  } catch (error) {
    console.log(' Database Error While Adding New Retails Outlet ' + error);
    response.status(200).send(' Database error while adding data');
  }
}
// END ADD NEW RETAIL OUTLET

// ADD NEW RETAIL OUTLET
const updateRetailOutlet = (request, response) => {
  const rodata = request.body;

  console.log('UPDATE RODATA', rodata);

  const query = {
    text: `UPDATE rodetails
           SET
              roname = $1,
              rotype = $2,
              address = $3,
              pincode = $4,
              city = $5,
              state = $6,
              country = $7,
              region = $8,
              dealername = $9,
              phonenumber = $10,
              email = $11,
              commissioningdate = $12,
              initializedate = $13,
              resitementdate = $14,
              sivendor = $15,
              atgvendor = $16,
              csid = $17,
              updateby = $18
           WHERE 
              rocode = $19;`,
    values: [
      rodata.roname,
      rodata.rotype,
      rodata.address,
      rodata.pincode,
      rodata.city,
      rodata.state,
      rodata.country,
      rodata.region,
      rodata.dealername,
      rodata.phonenumber,
      rodata.email,
      rodata.commissioningdate,
      rodata.initializedate,
      rodata.resitementdate,
      rodata.sivendor,
      rodata.atgvendor,
      rodata.csid,
      rodata.updateby,
      rodata.rocode
    ]
  };

  try {
    client.query(query)
      .then(() => {
        console.log(rodata.rocode + ' RETAIL OUTLET UPDATED SUCCESSFULLY ');
        response.status(200).json({ message: 'Retail Outlet Updated Successfully' }); // Return success message
      })
      .catch((error) => {
        console.log('ERROR WHILE UPDATING RETAIL OUTLET ' + error);
        response.status(500).send('Something Went Wrong while updating Retail Outlet');
      });
  } catch (error) {
    console.log('Database Error While Updating Retail Outlet ' + error);
    response.status(500).send('Database error while updating data');
  }
}


// END ADD NEW RETAIL OUTLET

//ADD ADMIN CREDENTAILS
async function createUserCredentials(rocode, updateby) {
  let hashPassword = await bcrypt.hash(`admin$` + rocode, 10);
  const query = {
    text: `INSERT INTO usercredentials(
                                username, 
                                password,
                                role,
                                updateby
                              )
            VALUES($1,$2, $3, $4)`,
    values: [rocode + `@admin.com`, hashPassword, 'admin', updateby],
  }

  try {
    client.query(query)
      .then(() => {
        console.log(rocode + ' USER CREDENTIALS ADDED SUCCESSFULLY FOR ROCODE ' + rocode);
        return
      })
      .catch((error) => {
        console.log(' ERROR WHILE CREATING USER CREDENTIALS FOR ROCODE ' + rocode + ' ' + error.message);
        return
      })
  } catch (error) {
    console.log(' DATABASE ERROR WHILE CREATING USER CREDENTIALS FOR ROCODE ' + rocode + ' ' + error.message);
    return
  }
}
//END ADD ADMIN CREDENTAILS

// GET RETAIL OUTLET DATA FOR ROCODE
const getRetailOutlet = (request, response) => {
  const rocode = request.query.rocode;

  const query = {
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
                dealername,
                phonenumber,
                email,
                resitementdate,
                initializedate,
                commissioningdate,
                updateflag
            FROM 
                rodetails
            WHERE 
                rocode = $1
            AND 
                isenable = 1`,
    values: [rocode]
  }

  try {
    client.query(query)
      .then((result) => {
        if (result.rows.length > 0) {
          response.status(200).send(result.rows);
        }
        else {
          console.log(' RETAIL OUTLET NOT FOUND FOR ROCODE : ' + rocode);
          response.status(200).send(' Retail Outlet Not Found ');
        }
      })
      .catch((error) => {
        console.log(' ERROR WHILE GETTING RETAIL OUTLET FOR ROCODE : ' + rocode + ' ' + error.message);
        response.status(200).send(' Something Went Wrong While getting Retail Outlet ')
      })
  } catch (error) {
    console.log(' Database Error in get Retail Outlet ' + error);
    response.status(200).send(' Database error while Getting Retail Outlet ');
  }
}
// END GET RETAIL OUTLET DATA

const getRetailOutletList = (request, response) => {
  const query = {
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
                dealername,
                email,
                phonenumber,
                mobilenumber,
                commissioningdate,
                initializedate,
                resitementdate,
                sivendor,
                atgvendor,
                updatetime
            FROM 
                rodetails
            WHERE 
                isenable = 1`,
  };

  try {
    client.query(query)
      .then((result) => {
        if (result.rows.length > 0) {
          response.status(200).send(result.rows);
        }
        else {
          console.log(' RETAIL OUTLET LIST NOT FOUND  ');
          response.status(200).send(' Retail Outlet List Not Found ');
        }
      })
      .catch((error) => {
        console.log(' ERROR WHILE GETTING RETAIL OUTLET LIST : ' + error.message);
        response.status(200).send(' Something Went Wrong While getting Retail Outlet List')
      })
  } catch (error) {
    console.log(' Database Error in get Retail Outlet List' + error);
    response.status(200).send(' Database error while Getting Retail Outlet List');
  }
}

module.exports = { addRetailOutlet, getRetailOutlet, getRetailOutletList, updateRetailOutlet }

