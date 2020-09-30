/**
 * Consume message from queue
 *
 * @param {string} queue - Message queue
 */
const consumeMessage = async (channel, queue) => {
  try {
    await channel.assertQueue(queue)
    channel.consume(queue, (message) => {
      const order = JSON.parse(message.content.toString())
      // make and verify payment
      // channel.ack(message)
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  consumeMessage
}
