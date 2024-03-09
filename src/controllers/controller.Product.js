const { client } = require('../config/config.database');
const getRoautoid = require('./controller.common');

// ADD NEW PRODUCT
const addProduct = (request, response) => {
    const rocode = request.query.rocode;
    const product = request.body;

    console.log(' NEW PRODUCT : ', product);

    const query = {
        text: `INSERT INTO productdetails(
                                roautoid,
                                masterproductid,
                                price,
                                csid,
                                updateby
                                )
                VALUES($1,$2,$3,$4,$5)`,
        values: Object.values(product),
    };

    try {
        client.query(query)
            .then(() => {
                console.log(' PRODUCT ADDED SUCCESSFULLY FOR RO CODE : ' + rocode + ' MASTER PRODUCT ID : ' + product.masterproductid);
                response.status(200).json({ message: ' Product Added Successfully ' });
            })
            .catch((error) => {
                console.log(' ERROR WHILE ADDING PRODUCT FOR RO CODE : ' + rocode + ' ' + error.message);
                response.status(200).send(' Something Went Wrong While Adding Product ');
            });
    }
    catch (error) {
        console.log(' Database Error In Add Product' + error);
        response.status(200).send(' Database Error ')
    }
}
// END ADD NEW PRODUCT

// GET PRODUCT LIST
const getProductList = async (request, response) => {
    const rocode = request.query.rocode;
    const roautoid = await getRoautoid(rocode)
    
    const query = {
        text: `SELECT 
                    productdetails.id, code, color, price,csid , productdetails.updatetime
                FROM
                    productdetails 
                JOIN 
                    masterproduct ON productdetails.masterproductid = masterproduct.id
                WHERE 
                    roautoid = $1 
                AND 
                    productdetails.isenable=1`, 
        values: [roautoid]
    }

    try {
        client.query(query)
            .then((result) => {
                if (result.rows.length > 0) {
                    response.status(200).send(result.rows)
                }
                else {
                    console.log(' PRODUCT LIST NOT FOUND FOR RO CODE : ' + rocode);
                    response.status(200).json({message:' Product List Not Found '});
                }
            })
            .catch((error) => {
                console.log(' ERROR WHLE GETTING PRODUCT LIST FOR RO CODE : ' + rocode + ' ' + error.message);
                response.status(200).send(' Something Went Wrong While Getting Product List ');
            })
    } catch (error) {
        console.log(' Database Error In Get Product List ' + error);
        response.status(200).send(' Database error ');
    }
}
// END GET PRODUCT LIST

// GET MASTER PRODUCT LIST
const getMasterProductList = (request, response) => {
    const query = {
        text: `SELECT 
                    id,
                    code,
                    color 
                FROM
                    masterproduct;`
    }

    try {
        client.query(query)
            .then((result) => {
                if (result.rows.length > 0) {
                    response.status(200).send(result.rows)
                }
                else {
                    console.log(' MASTER PRODUCT LIST NOT FOUND ');
                    response.status(200).send(' Master Product List Not found ');
                }
            })
            .catch((error) => {
                console.log(' ERROR WHILE GETTING MASTER PRODUCT LIST ' + error.message);
                response.status(200).send(' Something Went Wrong While getting Master Product List ');
            })
    } catch (error) {
        console.log(' Database Error Get Master Product List' + error);
        response.status(200).send(' Database error ');
    }
}
// END GET MASTER PRODUCT LIST

module.exports = { addProduct, getProductList, getMasterProductList }