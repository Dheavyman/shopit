/**
 * Consume message from queue
 *
 * @param {string} queue - Message queue
 */
const consumeMessage = async (channel, queue) => {
  try {
    await channel.assertQueue(queue)
    channel.consume(queue, (message) => {
      // confirm payment
      const order = JSON.parse(message.content.toString())
      // channel.ack(message)
    })
  } catch (error) {
    console.error(error)
  }
}

process.on('exit', (code) => {
  channel.close();
  console.log('Message broker channel closed. Process exited with code: ', code);
});

module.exports = {
  consumeMessage
}
