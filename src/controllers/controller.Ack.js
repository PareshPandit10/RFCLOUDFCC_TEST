const { client } = require('../config/config.database');

const dataAck = (request, response) => {
    const ackData = request.body;
    const rocode = request.query.rocode;

    console.log(request.body);

    switch (ackData.ackType) {

        case 1: // PRICE CHANGE ACK

            ackData.data.forEach(data => {

                const query = {
                    text: `UPDATE 
                                pricechange
                            SET
                                status = $1
                            WHERE
                                id = $2`,
                    values: [data.status, data.id]
                }

                client.query(query)
                    .then(() => {
                        console.log(' PRICE CHANGE ACK UPDATED FOR RO CODE ' + rocode + ' ID : ' + data.id +  ' STATUS ' + data.status);
                    })

                    .catch((error) => {
                        console.log(' ERROR WHILE UPDATING  PRICE CHANGE  ACK ' + error);
                        response.status(200).json({ message: 'Error while Adding Price Change Ack ' })
                    })
            });

            response.status(200).json({ message: 'Price Change Ack Updated Successfully' })
            break;


        default:
            console.log('No Data Type Match');
            response.status(200).json({ message: 'No Data Type Match' })
            break;
    }

}

module.exports = { dataAck }    