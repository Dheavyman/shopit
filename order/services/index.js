const { v4: uuidV4 } = require('uuid')
const Order = require('../models')
const { publishMessage } = require('../messages')

class OrderServices {
  static placeOrder (call, callback) {
    const data = {
      customerId: call.request.customerId,
      productId: call.request.productId,
      orderId: uuidV4(),
      quantity: call.request.quantity
    }

    const newOrder = new Order(data)
    newOrder.save((error, order) => {
      publishMessage(process.env.MESSAGE_QUEUE, order)
      callback(error, order)
    })
  }
}

module.exports = OrderServices
