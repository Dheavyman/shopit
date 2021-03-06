const { v4: uuidV4 } = require('uuid')
const Order = require('../models')
const { publishMessage } = require('../messages')

/**
 * Order service
 *
 * @class OrderServices
 */
class OrderServices {
  /**
   * Place order
   *
   * @static
   * @param {object} call - Client request
   * @param {function} callback - Response to client request
   * @memberof OrderServices
   */
  static placeOrder (call, callback) {
    const data = {
      customerId: call.request.customerId,
      productId: call.request.productId,
      orderId: uuidV4(),
      amount: call.request.amount,
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
