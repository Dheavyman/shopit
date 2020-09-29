const amqp = require('amqplib')

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
 * Consume message from queue
 *
 * @param {string} queue - Message queue
 */
const consumeMessage = async (queue) => {
  try {
    await ch.assertQueue(queue)
    ch.consume(queue, (message) => {
      if (message) {
        // confirm payment
        console.log('==============', message)
        // ch.ack(message)
      }
    })
  } catch (error) {
    console.error(error)
  }
}

process.on('exit', (code) => {
  ch.close();
  console.log('Message broker channel closed. Process exited with code: ', code);
});

module.exports = {
  consumeMessage
}
