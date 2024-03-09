require('dotenv').config();

const amqpConfig = {
    protocol: 'amqp',
    host: process.env.AMQP_HOST,
    port: process.env.AMQP_PORT,
    username: process.env.AMQP_USERNAME,
    password: process.env.AMQP_PASSWORD,
};

module.exports = { amqpConfig }