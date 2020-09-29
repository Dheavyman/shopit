const dotenv = require('dotenv')
const amqp = require('amqplib')
dotenv.config()
const { consumeMessage } = require('./messages')

amqp.connect(process.env.AMQP_URL)
  .then(conn => {
    return conn.createChannel()
  })
  .then(channel => {
    consumeMessage(channel, process.env.MESSAGE_QUEUE)
  })
  .catch(console.error)
