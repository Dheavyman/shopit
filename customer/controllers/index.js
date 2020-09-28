const Customer = require('../models')
const mongoose = require('../db')
const client = require('../client')

class CustomerController {
  static getCustomers(req, res) {
    Customer.find({}, (error, customers) => {
      if (error) {
        return res.status(500).send({
          status: 'error',
          message: error
        })
      }
      return res.send({
        status: 'success',
        message: 'Customers retrieved',
        data: customers
      })
    })
  }

  static placeOrder(req, res) {
    const order = {
      customerId: req.body.customerId,
      productId: req.body.productId,
      quantity: req.body.quantity,
    }

    mongoose.mongo.db.collection('products').findOne({productId: order.productId}, (error, product) => {
      if (!product) {
        return res.status(404).send({
          status: "error",
          message: "Product not found"
        })
      }

      if (product.quantity < order.quantity) {
        return res.status(400).send({
          status: "error",
          message: "Order quantity exceeds available product quantity"
        })
      }
    })

    client.placeOrder(order, (error, order) => {
      if (error) {
        return res.status(500).send({
          status: 'error',
          message: error
        })
      }
      return res.status(201).send({
        status: 'success',
        message: 'Order placed',
        data: order
      })
    })
  }
}

module.exports = CustomerController
