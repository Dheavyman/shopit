const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  address: String
})

module.exports = mongoose.model('Customer', CustomerSchema)
