const axios = require('axios')
const Customer = require('../models')
const client = require('../client')

/**
 * Customer controller
 *
 * @class CustomerController
 */
class CustomerController {
  /**
   * Get customers
   *
   * @static
   * @param {object} req - Request
   * @param {*} res - Response
   * @memberof CustomerController
   */
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

  /**
   * Place an order
   *
   * @static
   * @param {object} req - Request
   * @param {object} res - Response
   * @memberof CustomerController
   */
  static async placeOrder(req, res) {
    const order = {
      customerId: req.body.customerId,
      productId: req.body.productId,
      quantity: req.body.quantity,
      amount: req.body.amount
    }

    try {
      const response = await axios.get(
        `${process.env.PRODUCT_SERVICE_URL}/api/products/${order.productId}`)
      const { data: product } = response.data

      if (product.quantity < order.quantity) {
        return res.status(400).send({
          status: "error",
          message: "Order quantity exceeds available product quantity"
        })
      }
    } catch (error) {
      if (error.response.status === 404) {
        return res.status(404).send({
          status: "error",
          message: "Product not found"
        })
      }

      return res.status(500).send({
        status: 'error',
        message: error
      })
    }

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
