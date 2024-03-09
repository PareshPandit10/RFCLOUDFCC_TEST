const { client } = require("../config/config.database");

const getDaySaleTotalByRoid = (request, response) => {
    const roautoid = request.query.roautoid;

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
                    console.log('Day sale :', result.rows[0].total_sale);
                }
                else {
                    console.log("Total Sale : 0");
                    response.status(200).json(0.00)
                }
            }
        });
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
            masterproduct ON productdetails.masterproductid = masterproduct.id
        WHERE
            pumptransactions.roautoid = $1
        AND 
            DATE(pumptransactions.starttime) = CURRENT_DATE
        GROUP BY
            masterproduct.code;`,
        [roautoid],
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
    const roautoid = request.query.roautoid;
    client.query(
        `SELECT
            nozzledetails.nozzleid,
            dispenserdetails.dispenserid,
            pumpdetails.pumpid,
            SUM(pumptransactions.amount) AS total_sale,
            SUM(pumptransactions.volume) AS total_volume
        FROM
            pumptransactions
        JOIN
            nozzledetails ON pumptransactions.nozzleautoid = nozzledetails.id
        JOIN
            pumpdetails ON nozzledetails.pumpautoid = pumpdetails.id
        JOIN
            dispenserdetails ON pumpdetails.dispenserautoid = dispenserdetails.id
         WHERE
            pumptransactions.roautoid = $1
        AND 
            DATE(pumptransactions.starttime) = CURRENT_DATE
        GROUP BY
            nozzledetails.nozzleid,
            dispenserdetails.dispenserid,
			pumpdetails.pumpid;`,
        [roautoid],
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
};

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
                nozzledetails ON pumptransactions.nozzleautoid = nozzledetails.nozzleid
            JOIN
                tankdetails ON nozzledetails.tankautoid = tankdetails.id
            JOIN
                productdetails ON tankdetails.id = productdetails.id
            JOIN
                masterproduct ON productdetails.id = masterproduct.id
            WHERE
                pumptransactions.starttime BETWEEN $1 AND $2 AND pumptransactions.roid = $3
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

const getPumpTrxnByPeriod = (request, response) => {
    const roautoid = request.query.roautoid;
    let startDate = request.query.startDate;
    let endDate = request.query.endDate;

    console.log(roautoid, startDate, endDate);

    client.query(`
    SELECT 
        pumptransactions.id,
        rodetails.rocode,
        nozzledetails.nozzleid,
        pumpdetails.pumpid,
        dispenserdetails.dispenserid,
        masterproduct.code,
        mop,    
        TO_CHAR(starttime, 'YYYY-MM-DD HH24:MI:SS') as starttime,
        TO_CHAR(endtime, 'YYYY-MM-DD HH24:MI:SS') as endtime,
        CAST(pumptransactions.price AS NUMERIC(10, 2)) as price,
        CAST(amount AS NUMERIC(10, 2)) as amount,
        CAST(volume AS NUMERIC(10, 2)) as volume,
        CAST(starttotalizer AS NUMERIC(10, 2)) as starttotalizer,
        CAST(endtotalizer AS NUMERIC(10, 2)) as endtotalizer
    FROM 
        pumptransactions
    JOIN
        nozzledetails ON pumptransactions.nozzleautoid = nozzledetails.id
    JOIN
        pumpdetails ON nozzledetails.pumpautoid = pumpdetails.id
    JOIN
        dispenserdetails ON pumpdetails.dispenserautoid = dispenserdetails.id
    JOIN
        tankdetails ON nozzledetails.tankautoid = tankdetails.id
    JOIN
        productdetails ON tankdetails.id = productdetails.id
    JOIN
        masterproduct ON productdetails.masterproductid = masterproduct.id
    JOIN 
        rodetails ON pumptransactions.roautoid = rodetails.id
    WHERE
        pumptransactions.starttime BETWEEN $1 AND $2 AND pumptransactions.roautoid = $3
    GROUP BY
        pumptransactions.id,
        rodetails.rocode,
        dispenserid,
        pumpid,
        nozzleid,
        masterproduct.code,
        starttime,
        endtime,
        mop,
        pumptransactions.price,
        amount,
        volume,
        starttotalizer,
        endtotalizer
    ORDER BY 
        pumptransactions.id,
        rodetails.rocode,
        dispenserid,
        pumpid,
        nozzleid,
        masterproduct.code,
        starttime,
        endtime,
        mop,
        pumptransactions.price,
        amount,
        volume,
        starttotalizer,
        endtotalizer;`,
        [startDate, endDate, roautoid], (error, result) => {
            if (error) {
                console.error("Error occurred while getting Pump Transactions By Period:", error);
                response.status(500).json({ error: "Internal Server Error in Pump Transactions By Period " });
            } else {
                if (result.rows.length > 0) {
                    response.status(200).json(result.rows);
                } else {
                    console.log("No Pump Transactions Found By this Period");
                }
            }
        });
}

module.exports = { getDaySaleTotalByRoid, getProductSaleByRoid, getNozzleSaleByRoid, getProductSalesByPeriod, getPumpTrxnByPeriod }