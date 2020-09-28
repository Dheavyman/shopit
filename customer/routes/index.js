const express = require('express')
const CustomerController = require('../controllers')

const router = express.Router()

router.get('/customers', CustomerController.getCustomers)
router.post('/orders', CustomerController.placeOrder)

module.exports = router
