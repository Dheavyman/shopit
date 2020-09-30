const dotenv = require('dotenv')
const amqp = require('amqplib')
dotenv.config()
const { consumeMessage } = require('./messages')

let ch = null

amqp.connect(process.env.AMQP_URL)
  .then(conn => {
    return conn.createChannel()
  })
  .then(channel => {
    ch = channel
    consumeMessage(channel, process.env.MESSAGE_QUEUE)
  })
  .catch(console.error)

process.on('exit', (code) => {
  if (ch) {
    ch.close();
    console.log('Message broker channel closed. Process exited with code: ', code);
  }
});
