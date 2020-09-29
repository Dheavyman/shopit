// const dotenv = require('dotenv')
const amqp = require('amqplib')

// dotenv.config()

let ch = null

amqp.connect(process.env.AMQP_URL)
  .then(conn => {
    return conn.createChannel()
  })
  .then(channel => {
    ch = channel
  })
  .catch(console.error)

/**
 * Publish message to queue
 *
 * @param {string} queue - Message queue
 * @param {string} message - Message to send
 */
const publishMessage = async (queue, message) => {
  try {
    await ch.assertQueue(queue, {durable: true})
    ch.sendToQueue(queue, Buffer.from(message), {persistent: true})
  } catch (error) {
    console.error(error)
  }
}

process.on('exit', (code) => {
  ch.close();
  console.log('Message broker channel closed. Process exited with code: ', code);
});

module.exports = {
  publishMessage
}
