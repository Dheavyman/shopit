const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  customerId: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'fulfill', 'unfulfilled'],
    default: 'pending'
  }
})

module.exports = mongoose.model('Order', OrderSchema)
