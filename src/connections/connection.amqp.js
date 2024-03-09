const amqp = require('amqplib/callback_api');
const amqpConfig = require('../config/config.amqp');

class AMQPConnection {
  
  constructor() {
    if (AMQPConnection.instance) {
      return AMQPConnection.instance;
    }

    this.connection = null;
    this.channel = null;

    AMQPConnection.instance = this;
  }

  EXCHANGE = process.env.AMQP_EXCHANGE;
  QUEUE = process.env.AMQP_QUEUE;
  KEY = process.env.AMQP_KEY;

  async connect() {
    try {
      this.connection = await new Promise((resolve, reject) => {
        amqp.connect(amqpConfig, (error, connection) => {
          if (error) {
            console.error(' RABBITMQ SERVER CONNECTION FAILED !!! ', error.message);
            reject(error);
          } else {
            console.log(' RABBITMQ SERVER CONNECTION ESTABLISHED SUCCESSFULLY... ');
            resolve(connection);
          }
        });
      });

      this.channel = await new Promise((resolve, reject) => {
        this.connection.createChannel((error, channel) => {
          if (error) {
            console.error(' RABBITMQ CHANNEL CREATION FAILED !!! ', error.message);
            reject(error);
          } else {
            console.log(' RABBITMQ CHANNEL CREATED SUCCESSFULLY... ');
            resolve(channel);
          }
        });
      });

      try {
        this.channel.assertExchange(this.EXCHANGE, 'direct', { durable: true });
        this.channel.assertQueue(this.QUEUE, { durable: true });
        this.channel.bindQueue(this.QUEUE, this.EXCHANGE, this.KEY);

        console.log(' RABBITMQ EXCHANGE & QUEUE ASSERTED SUCCESSFULLY... ');
        return this.channel;
      } catch (error) {
        console.log(' ERROR WHILE ASSERTING EXCHANGE, QUEUE ' + ' ' +  error.message);
      }
    } catch (error) {
      console.error(' ERROR WHILE CONNECTING TO RABBITMQ SERVER ',+ ' ' + error.message);
    }
  }
  
  getChannel() {
    return this.channel;
  }

  closeConnection() {
    if (this.connection) {
      this.connection.close();
    }
  }
}

module.exports = AMQPConnection;
