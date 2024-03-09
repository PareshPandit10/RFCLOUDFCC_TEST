const { client } = require("../config/config.database");

const getDaySaleTotalByRoid = (request, response) => {
    const roautoid = request.query.roid
    client.query(`SELECT DATE(starttime) AS transaction_date, SUM(amount) AS total_sale
                FROM 
                    pumptransactions
                WHERE 
                    roautoid = $1 AND DATE(starttime) = CURRENT_DATE
                GROUP BY 
                    transaction_date
                ORDER BY 
                    total_sale;`,
        [roautoid], (err, result) => {
            if (err) {
                console.log(err);
                response.status(500).json({ err })
            }
            else {
                if (result.rows.length > 0) {
                    console.log("Total Sale " + result.rows[0].total_sale);
                    response.status(200).json(result.rows[0].total_sale)
                }
                else {
                    console.log("Total Sale : 0");
                    response.status(200).json(0.00)
                }
            }
        })
}

const getProductSaleByRoid = (request, response) => {
    const roautoid = request.query.roautoid;
    client.query(
        `SELECT
            masterproduct.code,
            SUM(pumptransactions.amount) AS total_sale
        FROM
            pumptransactions
        JOIN
            nozzledetails ON pumptransactions.nozzleautoid = nozzledetails.id
        JOIN
            tankdetails ON nozzledetails.tankautoid = tankdetails.id
        JOIN
            productdetails ON tankdetails.productautoid = productdetails.id
        JOIN
            masterproduct ON productdetails.productautoid = masterproduct.id
        WHERE
            pumptransactions.roautoid = $1
        AND 
            DATE(pumptransactions.starttime) = CURRENT_DATE
        GROUP BY
            masterproduct.code;`,
        [roid],
        (error, result) => {
            if (error) {
                console.error("Error occurred while getting Product Sale:", error);
                response.status(500).json({ error: "Internal Server Error" });
            }
            else {
                if (result.rows.length > 0) {
                    console.log("Product Sale :");
                    result.rows.forEach((product) => {
                        console.log(product.code + " " + product.total_sale);
                    });
                    response.status(200).json(result.rows);
                }
                else {
                    console.log("No Product Sale Found");
                }
            }
        }
    );
};

const getNozzleSaleByRoid = (request, response) => {
    const roid = request.query.roid;
    client.query(
        `SELECT
            nozzledetails.nozzleid,
            SUM(pumptransactions.amount) AS total_sale
        FROM
            pumptransactions
        JOIN
            nozzledetails ON pumptransactions.nozzleautoid = nozzledetails.id
        WHERE
            pumptransactions.roautoid = $1
        AND 
            DATE(pumptransactions.starttime) = CURRENT_DATE
        GROUP BY
            nozzledetails.nozzleid;`,
        [roid],
        (error, result) => {
            if (error) {
                console.error("Error occurred while getting Nozzle Sale:", error);
                response.status(500).json({ error: "Internal Server Error" });
            }
            else {
                if (result.rows.length > 0) {
                    console.log("Nozzle Sale :");
                    result.rows.forEach((nozzle) => {
                        console.log(nozzle.nozzleid + " " + nozzle.total_sale);
                    });
                    response.status(200).json(result.rows);
                }
                else {
                    console.log("No Nozzle Sale Found");
                }
            }
        }
    );
}

const getProductSalesByPeriod = (request, response) => {
    const roautoid = request.query.roautoid;
    let startDate = request.query.startDate;
    let endDate = request.query.endDate;
    client.query(
        `SELECT
                DATE_TRUNC('day', pumptransactions.starttime) AS sales_date,
                masterproduct.code,
                CAST(SUM(pumptransactions.amount) AS NUMERIC(10, 2)) AS total_sales
            FROM
                pumptransactions
            JOIN
                nozzledetails ON pumptransactions.nozzleautoid = nozzledetails.id
            JOIN
                tankdetails ON nozzledetails.tankautoid = tankdetails.id
            JOIN
                productdetails ON tankdetails.productautoid = productdetails.id
            JOIN
                masterproduct ON productdetails.masterproductid = masterproduct.id
            WHERE
                pumptransactions.starttime BETWEEN $1 AND $2 AND pumptransactions.roautoid = $3
            GROUP BY
                sales_date,
                masterproduct.code
            ORDER BY
                sales_date, masterproduct.code;`,
        [startDate, endDate, roautoid], (error, result) => {
            if (error) {
                console.error("Error occurred while getting Product Sale By Period:", error);
                response.status(500).json({ error: "Internal Server Error in Product Sale by Period " });
            }
            else {
                if (result.rows.length > 0) {
                    console.log("Product Sale By Period :");
                    result.rows.forEach((product) => {
                        console.log(product.sales_date + " " + product.code + " " + product.total_sale);
                    });
                    response.status(200).json(result.rows);
                }
                else {
                    console.log("No Product Sale Found By this Period");
                }
            }
        })
}

module.exports = { getDaySaleTotalByRoid, getProductSaleByRoid, getNozzleSaleByRoid, getProductSalesByPeriod }