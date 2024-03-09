const amqp = require('../connections/connection.amqp');
const AMQPConnection = require('../connections/connection.amqp');
const Schema = require('../Proto/RFCloudFCC_PROTO_v3_pb');
const { Inbox } = require('../messages/messages.Inbox');

class AMQPService {

    constructor() {
        if (AMQPService.instance) { 
            return AMQPService.instance;
        }
        AMQPService.instance = this;
    }

    async startAMQPService() {
        this.channel = new AMQPConnection().getChannel();
        await this.consumeMessage();
    }

    async consumeMessage() {
        try {
            await this.channel.consume(amqp.QUEUE, (packet) => {
                if (packet) {
                    const msg = Schema.deviceData.deserializeBinary(packet.content);
                    Inbox(msg)
                    this.channel.ack(packet);
                }
            });

            console.log(' RABBITMQ READY TO RECEIVE MESSAGES... ');
        } catch (error) {
            console.error(' RABBITMQ IS NOT READY TO RECEIVE MESSAGES !!!', error.message);
        }
    }

    async publishMessage(packet) {
        console.log('amqp publishes the messages');
        try {
            await this.channel.publish(amqp.EXCHANGE, amqp.KEY, packet, { persistent: true }), (error, ok) => {
                if (error) {
                    console.log(' ERROR WHILE PUBLISHING THE MESSAGE !!! ' + error.message);
                }
                if (ok) {
                    console.log(' MESSAGE PUBLISHED SUCCESSFULLY... ');
                }
            }
        } catch (error) {
            console.log(' ERROR WHILE PUBLISHING THE MESSAGE !!! ' + error.message);
        }
    }
}

module.exports = AMQPService;